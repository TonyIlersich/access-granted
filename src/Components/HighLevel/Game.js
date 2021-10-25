import DefaultColumn from '../Containers/DefaultColumn';
import Panel from '../Containers/Panel';
import FixedAspect from '../Containers/FixedAspect.js';
import Borders from '../../Styles/Borders';
import Keyboard from '../Feedback/Keyboard';
import styled from 'styled-components';
import React from 'react';
import MapView from '../Svg/MapView';
import Inspector from '../Feedback/Inspector';
import { Map, NodeStates, NodeTypes } from '../../Models/Map';
import DefaultText from '../Texts/DefaultText';
import Colors from '../../Styles/Colors';
import MinigameView from '../Svg/MinigameView';
import Timer from '../Feedback/Timer';
import MusicPlayer, { Songs } from '../Feedback/MusicPlayer';
import DefaultRow from '../Containers/DefaultRow';
import { MinigameTypes } from '../../Models/Minigame';

const WideScreenContainer = styled(FixedAspect)`
  border: ${Borders.DefaultPanelBorder};
`;

const Button = styled(DefaultText)`
  box-sizing: border-box;
  border: ${Borders.DefaultPanelBorder};
  background-color: ${Colors.HalfCyan};
  text-align: center;
  font-size: 2.5vw;
  padding: .5vw;
  margin: .5vw;
  &:hover {
    cursor: pointer;
    background-color: ${Colors.HalfBlue};
  }
`;

export default class Game extends React.Component {
  _map = new Map();
  _infectedData = 0;

  state = {
    selectedNode: null,
    activeMap: this._map._nodes[this._map._baseId].subMap,
    minigame: null,
    lostRam: 0,
    inspectorOverride: null,
    muted: false,
  };

  render() {
    return (
      <WideScreenContainer ratio={16 / 9}>
        <MusicPlayer
          song={!this.state.minigame
            ? Songs.AlphaDecay
            : (this.state.minigame.type === MinigameTypes.Hash
              ? Songs.Autobahn
              : Songs.Mastret
            )}
          muted={this.state.muted} />
        <DefaultColumn width='70%'>
          <Panel height='60%'>
            {this.state.minigame
              ? (
                <MinigameView
                  minigame={this.state.minigame}
                  onWin={this._onWin}
                  onLose={this._onLose}
                />
              ) : (
                <MapView
                  map={this.state.activeMap}
                  onClickNode={selectedNode => this.setState({ selectedNode, inspectorOverride: null })}
                  onDeselect={() => this.setState({ selectedNode: null, inspectorOverride: null })}
                  selectedNode={this.state.selectedNode}
                />
              )}
          </Panel>
          <Panel>
            <Keyboard />
          </Panel>
        </DefaultColumn>
        <DefaultColumn width='30%'>
          <Panel height='75%'>
            <Inspector
              title={this.state.inspectorOverride ? this.state.inspectorOverride.title : (this.state.minigame && this.state.minigame.title) ||
                (this.state.selectedNode && this.state.selectedNode.label)}
              body={this.state.inspectorOverride ? this.state.inspectorOverride.body : (this.state.minigame && this.state.minigame.desc) ||
                (this.state.selectedNode && (
                  this.state.selectedNode.desc +
                  (this.state.selectedNode.ram ? ` RAM: ${this.state.selectedNode.ram} GB` : '') +
                  (this.state.selectedNode.type === NodeTypes.Database ? ` Data: ${this.state.selectedNode.data} TB` : '')
                ))}
            >
              {!this.state.inspectorOverride &&
                this.state.selectedNode &&
                this.state.selectedNode.isExposed && (
                  <Button onClick={() => this.setState({ activeMap: this._map, selectedNode: null })}>
                    Leave Network
                  </Button>
                )}
              {!this.state.inspectorOverride &&
                this.state.selectedNode &&
                this.state.selectedNode.subMap && (
                  <Button onClick={() => this.setState({ activeMap: this.state.selectedNode.subMap, selectedNode: null })}>
                    Enter Network
                  </Button>
                )}
              {!this.state.inspectorOverride &&
                this.state.selectedNode &&
                this.state.selectedNode.state === NodeStates.Online &&
                this.state.activeMap.canInfect(this.state.selectedNode.id, this._map._nodes.some(n => n.state === NodeStates.Infected)) &&
                this.state.selectedNode.minigameInfo && (
                  <Button onClick={this._onAttack}>Attack</Button>
                )}
              {!this.state.inspectorOverride &&
                this.state.selectedNode &&
                this.state.selectedNode.state === NodeStates.Online &&
                this.state.activeMap.canInfect(this.state.selectedNode.id) &&
                !this.state.selectedNode.minigameInfo && (
                  <Button onClick={this._onInfect}>Infect</Button>
                )}
              {!this.state.inspectorOverride &&
                this.state.minigame &&
                this.state.minigame.timeLimit &&
                <Timer time={this.state.minigame.timeLimit} onTimeEnd={this._onLose} />
              }
            </Inspector>
          </Panel>
          <Panel>
            <DefaultText>RAM Available: {this._map.getInfectedRam() - this.state.lostRam} GB</DefaultText>
            <DefaultText>Data Compromised: {this._infectedData} / {.5 * this._map._getTotalData()} TB</DefaultText>
            <DefaultRow />
            <Button onClick={() => this.setState({ muted: !this.state.muted })}>{this.state.muted ? 'Unmute' : 'Mute'}</Button>
          </Panel>
        </DefaultColumn>
      </WideScreenContainer>
    );
  }
  _onAttack = () => {
    this.setState({ minigame: this.state.selectedNode.minigameInfo, targetNode: this.state.selectedNode, selectedNode: null });
  }
  _onWin = () => {
    this.state.activeMap._infectNode(this.state.targetNode.id);
    if (this.state.targetNode.type === NodeTypes.Database) {
      this._infectedData += this.state.targetNode.data;
    }
    console.log(this._infectedData);
    const isGameOver = this._infectedData / this._map._getTotalData() >= .5;
    this.setState({
      minigame: null,
      targetNode: null,
      inspectorOverride: isGameOver
        ? {
          title: `Mission Completed!`,
          body: `You've compromised ${this._infectedData} GB of sensitive data. You really are the best of the best. I'll take it from here. `
            + `(The game is over, but you can keep playing if you want. I hope you enjoyed it!)`,
        } : {
          title: `${this.state.targetNode.type} Infected!`,
          body: `The ${this.state.targetNode.type} is now under your control. You gained ${this.state.targetNode.ram} GB of RAM${
            this.state.targetNode.type === NodeTypes.Database ? ` and ${this.state.targetNode.data} TB of data` : ''
            }.`,
        },
    });
  }
  _onLose = () => {
    this.setState({
      minigame: null,
      targetNode: null,
      inspectorOverride: {
        title: `Failure!`,
        body: `You didn't infect the ${this.state.targetNode.type}, but you can try again. Every time you fail a cyber-attack, you 1 GB of RAM. `
          + `You gain some RAM every time you infect a device, depending on the type. If you're running low, try infecting some more cell phones.`,
      },
      lostRam: this.state.lostRam + 1,
    });
  }
  _onInfect = () => {
    this.state.activeMap._infectNode(this.state.selectedNode.id);
    this.setState({
      selectedNode: null,
      inspectorOverride: {
        title: `${this.state.selectedNode.type} Infected!`,
        body: `The ${this.state.selectedNode.type} is now under your control. You gained ${this.state.selectedNode.ram} GB of RAM.`,
      },
    });
  }
}