import React from 'react';
import { MinigameTypes } from '../../Models/Minigame';
import styled from 'styled-components';
import Colors from '../../Styles/Colors';
import DefaultText from '../Texts/DefaultText';
import DefaultRow from '../Containers/DefaultRow';

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

const MazeNodeText = styled.text`
  fill: ${Colors.Black};
  text-anchor: middle;
  dominant-baseline: middle;
  font-size: 4px;
  font-weight: 500;
`;

const MazeNodeBg = styled.circle`
  fill: ${props => props.isCurrent ? Colors.InfectedNode : (props.isEnd ? Colors.NeutralNode : Colors.DefaultStroke)};
  stroke: ${Colors.HalfCyan};
`;

const ColoredText = styled(DefaultText)`
  display: inline;
  color: ${props => props.color || Colors.Cyan};
  font-size: 6vw;
`;

export default class MinigameView extends React.Component {
  _keydown = {};
  _scale = 100;
  _nodeRadius = .1;
  _timerInterval = .01;
  _blockSpeed = 1;

  state = {};

  componentDidMount() {
    document.addEventListener('keydown', this._onKeyPress);
    document.addEventListener('keyup', this._onKeyRelease);
    switch (this.props.minigame.type) {
      case MinigameTypes.Maze:
        this.setState({ currentId: this.props.minigame.startId });
        break;
      case MinigameTypes.Blocks:
        this.setState({
          claimedPivotIds: [],
          pos: { ...this.props.minigame.startPos },
          blocks: this.props.minigame.blocks.map(b => {
            return { ...b, ...this._getRandDirection() };
          }),
        });
        this._timer = setInterval(() => {
          if (this.state.blocks) {
            let didLose = false;
            this.state.blocks.forEach(b =>
              didLose |= Math.max(Math.abs(b.x - this.state.pos.x), Math.abs(b.y - this.state.pos.y)) < .5
            );
            if (didLose) {
              this.props.onLose();
              this._timer && clearInterval(this._timer);
              return;
            }
            this.setState({
              blocks: this.state.blocks.map(b0 => {
                if (b0.immunity > 0) {
                  return { ...b0, immunity: (b0.immunity || 0) - 1 };
                }
                let b1 = { ...b0 };
                const touchingPivot = this.props.minigame.nodes.find(n =>
                  n.isPivot &&
                  Math.abs(n.x - b1.x) < 1e-4 &&
                  Math.abs(n.y - b1.y) < 1e-4
                );
                if (
                  touchingPivot ||
                  b1.x <= 0 ||
                  b1.y <= 0 ||
                  b1.x >= this.props.minigame.width - 1 ||
                  b1.y >= this.props.minigame.height - 1
                ) {
                  b1 = {
                    x: Math.round(b1.x),
                    y: Math.round(b1.y),
                    ...this._getRandDirection(b1),
                    immunity: 10,
                  };
                }
                const step = this._blockSpeed * this._timerInterval;
                return {
                  ...b1,
                  x: b1.x + b1.dx * step,
                  y: b1.y + b1.dy * step,
                };
              }),
            });
          }
        }, this._timerInterval);
        break;
      case MinigameTypes.Hash:
        this.setState({
          displaySegments: [{
            text: '*'.repeat(this.props.minigame.hash.length),
            color: Colors.Cyan,
          }],
          guess: '',
        });
        break;
      default:
        throw new Error(`Unexpected minigame type: '${this.props.minigame.type}'`);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this._onKeyPress);
    document.removeEventListener('keyup', this._onKeyRelease);
    this._timer && clearInterval(this._timer);
  }

  render() {
    switch (this.props.minigame.type) {
      case MinigameTypes.Maze:
        return this._renderMaze();
      case MinigameTypes.Blocks:
        return this._renderBlocks();
      case MinigameTypes.Hash:
        return this._renderHash();
      default:
        throw new Error(`Unexpected minigame type: '${this.props.minigame.type}'`);
    }
  }

  _renderMaze() {
    const { edges, nodes, width, height, endId } = this.props.minigame;
    return (
      <Svg viewBox={`0 0 ${2 * this._scale} ${1 * this._scale}`}>
        {edges.map(e => (
          <line
            key={`${e.id1}-${e.id2}`}
            x1={(nodes[e.id1].x + .5) / width * 2 * this._scale}
            y1={(nodes[e.id1].y + .5) / height * this._scale}
            x2={(nodes[e.id2].x + .5) / width * 2 * this._scale}
            y2={(nodes[e.id2].y + .5) / height * this._scale}
            stroke={Colors.DefaultStroke}
            strokeWidth={this._scale * .01}
          />
        ))}
        {nodes.map(n => (
          <React.Fragment key={n.id}>
            <MazeNodeBg
              key={`bg${n.id}`}
              cx={(n.x + .5) / width * 2 * this._scale}
              cy={(n.y + .5) / height * this._scale}
              r={this._scale * .03}
              strokeWidth={this._scale * .003}
              isCurrent={n.id === this.state.currentId}
              isEnd={n.id === endId}
            />
            <MazeNodeText
              key={`tx${n.id}`}
              x={(n.x + .5) / width * 2 * this._scale}
              y={(n.y + .5) / height * this._scale}
            >
              {n.key}
            </MazeNodeText>
          </React.Fragment>
        ))}
      </Svg>
    );
  }

  _renderBlocks() {
    const { width, height, nodes, hKeys, vKeys } = this.props.minigame;
    return (
      <Svg viewBox={`${-.0 * this._scale} ${-.2 * this._scale} ${2 * this._scale} ${1.2 * this._scale}`}>
        {nodes.map(n => {
          if (this.state.pos && n.x === this.state.pos.x && n.y === this.state.pos.y) {
            return (
              <circle
                key={n.id}
                cx={(n.x + .5) / width * 2 * this._scale}
                cy={(n.y + .5) / height * this._scale}
                r={this._scale * .03}
                strokeWidth={this._scale * .01}
                stroke={Colors.InfectedNode}
                fill={Colors.HalfRed}
              />
            );
          }
          if (n.isPivot) {
            return (
              <circle
                key={n.id}
                cx={(n.x + .5) / width * 2 * this._scale}
                cy={(n.y + .5) / height * this._scale}
                r={this._scale * .02}
                strokeWidth={this._scale * .01}
                stroke={this.state.claimedPivotIds && this.state.claimedPivotIds.includes(n.id) ? Colors.InfectedNode : Colors.HalfCyan}
              />
            )
          }
          return null;
        })}
        {this.state.blocks && this.state.blocks.map((b, idx) => (
          <rect
            key={idx}
            x={(b.x + .1) / width * 2 * this._scale}
            y={(b.y + .1) / height * this._scale}
            width={this._scale * .8 * 2 / width}
            height={this._scale * .8 / height}
            strokeWidth={this._scale * .02}
            stroke={Colors.Cyan}
          />
        ))}
        {hKeys.map((k, idx) => (
          <React.Fragment key={idx}>
            <MazeNodeBg
              key={`hbg${idx}`}
              cx={(idx + .5) / width * 2 * this._scale}
              cy={-.1 * this._scale}
              r={this._scale * .03}
              strokeWidth={this._scale * .003}
            />
            <MazeNodeText
              key={`htx${idx}`}
              x={(idx + .5) / width * 2 * this._scale}
              y={-.1 * this._scale}
            >
              {k}
            </MazeNodeText>
          </React.Fragment>
        ))}
        {vKeys.map((k, idx) => (
          <React.Fragment key={idx}>
            <MazeNodeBg
              key={`vbg${idx}`}
              cx={-.1 * this._scale}
              cy={(idx + .5) / height * this._scale}
              r={this._scale * .03}
              strokeWidth={this._scale * .003}
            />
            <MazeNodeText
              key={`vtx${idx}`}
              x={-.1 * this._scale}
              y={(idx + .5) / height * this._scale}
            >
              {k}
            </MazeNodeText>
          </React.Fragment>
        ))}
      </Svg>
    )
  }

  _renderHash() {
    return (
      <>
        <DefaultRow style={{ flexGrow: 0 }}>
          {this.state.displaySegments && this.state.displaySegments.map((d, idx) => (
            <ColoredText key={idx} color={d.color}>{d.text}</ColoredText>
          ))}
        </DefaultRow>
        <ColoredText>{this.state.guess}</ColoredText>
      </>
    );
  }

  _onKeyPress = event => {
    if (!this._keydown[event.key]) {
      this._keydown[event.key] = true;
      switch (this.props.minigame.type) {
        case MinigameTypes.Maze: {
          const { edges, nodes } = this.props.minigame;
          const adjacent = edges
            .filter(e => e.id1 === this.state.currentId || e.id2 === this.state.currentId)
            .map(e => e.id1 === this.state.currentId ? nodes[e.id2] : nodes[e.id1]);
          const target = adjacent.find(n => n.key === event.key.toLowerCase());
          if (target) {
            this.setState({ currentId: target.id });
            if (target.id === this.props.minigame.endId) {
              this.props.onWin();
            }
          }
          break;
        }
        case MinigameTypes.Blocks: {
          const { hKeys, vKeys, nodes } = this.props.minigame;
          console.log(hKeys.map((k, idx) => k === event.key ? idx : null));
          const x = hKeys.map((k, idx) => k === event.key.toLowerCase() ? idx : null).find(x => x !== null);
          const y = vKeys.map((k, idx) => k === event.key.toLowerCase() ? idx : null).find(y => y !== null);
          const pos = {
            ...this.state.pos,
            ...(Number.isInteger(x) ? { x } : {}),
            ...(Number.isInteger(y) ? { y } : {}),
          };
          const touchingPivot = nodes.find(n => n.isPivot && n.x === pos.x && n.y === pos.y);
          const claimedPivotIds = [
            ...this.state.claimedPivotIds,
            ...(touchingPivot && !this.state.claimedPivotIds.includes(touchingPivot.id) ? [touchingPivot.id] : [])
          ];
          if (claimedPivotIds.length === nodes.filter(n => n.isPivot).length) {
            this.props.onWin();
            break;
          }
          this.setState({ pos, claimedPivotIds });
          break;
        }
        case MinigameTypes.Hash: {
          const { keys, hash } = this.props.minigame;
          if (keys.includes(event.key)) {
            this.setState({ guess: this.state.guess + event.key });
          } else if (event.key.toLowerCase() === 'enter') {
            const displaySegments = [];
            const guess = this.state.guess.slice(0, hash.length)
            const gap = hash.length - guess.length;
            guess.split('').forEach((c, idx) => {
              let color = Colors.OnlineNode;
              if (c === hash[idx]) {
                color = Colors.InfectedNode;
              } else if (hash.includes(c)) {
                color = Colors.NeutralNode;
              } else {
                c = '*';
              }
              const prev = displaySegments.length > 0 && displaySegments[displaySegments.length - 1];
              if (prev && prev.color === color) {
                prev.text += c;
              } else {
                displaySegments.push({ text: c, color });
              }
            });
            displaySegments.push({ text: '*'.repeat(gap), color: Colors.OnlineNode });
            if (displaySegments.reduce((p, d) => p + (d.color === Colors.InfectedNode ? d.text.length : 0), 0) >= .5 * hash.length) {
              this.props.onWin();
            } else {
              this.setState({ displaySegments, guess: '' });
            }
          } else if (event.key.toLowerCase() === 'backspace' && this.state.guess.length > 0) {
            this.setState({ guess: this.state.guess.slice(0, -1) });
          }
          break;
        }
        default:
          throw new Error(`Unexpected minigame type: '${this.props.minigame.type}'`);
      }
    }
  }

  _onKeyRelease = e => {
    this._keydown[e.key] = false;
  }

  _getRandDirection(exclude = null) {
    const directions = [
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 }
    ].filter(d => !exclude || d.dx !== exclude.dx || d.dy !== exclude.dy);
    return directions[Math.floor(Math.random() * directions.length)];
  }
}