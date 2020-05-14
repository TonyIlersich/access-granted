import DefaultColumn from '../Containers/DefaultColumn';
import Panel from '../Containers/Panel';
import FixedAspect from '../Containers/FixedAspect.js';
import Borders from '../../Styles/Borders';
import Keyboard from '../Feedback/Keyboard';
import styled from 'styled-components';
import React from 'react';
import MapView from '../Svg/MapView';
import Inspector from '../Feedback/Inspector';
import { Map, NodeStates } from '../../Models/Map';
import DefaultText from '../Texts/DefaultText';
import Colors from '../../Styles/Colors';

const WideScreenContainer = styled(FixedAspect)`
  border: ${Borders.DefaultPanelBorder};
`;

const Button = styled(DefaultText)`
  box-sizing: border-box;
  border: ${Borders.DefaultPanelBorder};
  background-color: ${Colors.HalfCyan};
  text-align: center;
  font-size: 20px;
  padding: 8px;
  margin-top: 8px;
  &:hover {
    cursor: pointer;
    background-color: ${Colors.HalfBlue};
  }
`;

export default class Game extends React.Component {
  _map = new Map();

  state = {
    selectedNode: null,
    activeMap: this._map._nodes[this._map._baseId].subMap,
  };

  render() {
    return (
      <WideScreenContainer ratio={16 / 9}>
        <DefaultColumn width='70%'>
          <Panel height='60%'>
            <MapView
              map={this.state.activeMap}
              onClickNode={selectedNode => this.setState({ selectedNode })}
              onDeselect={() => this.setState({ selectedNode: null })}
              selectedNode={this.state.selectedNode}
            />
          </Panel>
          <Panel>
            <Keyboard />
          </Panel>
        </DefaultColumn>
        <Panel width='30%'>
          <Inspector
            title={this.state.selectedNode && this.state.selectedNode.label}
            body={this.state.selectedNode && this.state.selectedNode.desc}
          >
            {this.state.selectedNode && this.state.selectedNode.isExposed && (
              <Button onClick={() => this.setState({ activeMap: this._map, selectedNode: null })}>
                Leave Network
              </Button>
            )}
            {this.state.selectedNode && this.state.selectedNode.subMap && (
              <Button onClick={() => this.setState({ activeMap: this.state.selectedNode.subMap, selectedNode: null })}>
                Enter Network
              </Button>
            )}
            {this.state.selectedNode &&
              this.state.selectedNode.state === NodeStates.Online &&
              (this._map._nodes[this._map._baseId].subMap.isExposed() || this.state.activeMap.canInfect(this.state.selectedNode.id)) &&
              this.state.selectedNode.minigameInfo && (
                <Button onClick={this._onAttack}>Attack</Button>
              )}
            {this.state.selectedNode &&
              this.state.selectedNode.state === NodeStates.Online &&
              this.state.activeMap.canInfect(this.state.selectedNode.id) &&
              !this.state.selectedNode.minigameInfo && (
                <Button onClick={this._onInfect}>Infect</Button>
              )}
          </Inspector>
        </Panel>
      </WideScreenContainer>
    );
  }
  _onAttack = () => {
    // TODO: launch minigame
    this.state.activeMap._infectNode(this.state.selectedNode.id); // TEMP
    this.setState({}); // TEMP
  }
  _onInfect = () => {
    this.state.activeMap._infectNode(this.state.selectedNode.id);
    this.setState({});
  }
}