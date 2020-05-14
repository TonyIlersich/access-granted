import React from 'react';
import MapNode from './MapNode';
import styled from 'styled-components';
import MapEdge from './MapEdge';

const SvgContainer = styled.svg`
  width: 100%;
  height: 100%;
`;

export default class MapView extends React.Component {
  _scale = 100;
  _nodeRadius = .15;

  render() {
    return (
      <SvgContainer viewBox={`${-2 * this._scale} ${-1 * this._scale} ${4 * this._scale} ${2 * this._scale}`} onClick={this.props.onDeselect}>
        {this.props.map._edges.map((edge, idx) => (
          <MapEdge
            key={idx}
            scale={this._scale}
            nodeRadius={this._nodeRadius}
            edge={edge}
            node1={this.props.map._nodes[edge.id1]}
            node2={this.props.map._nodes[edge.id2]}
          />
        ))}
        {this.props.map._nodes.map(node => (
          <MapNode
            key={node.id}
            node={node}
            scale={this._scale}
            radius={this._nodeRadius}
            isSelected={this.props.selectedNode && this.props.selectedNode.id === node.id}
            onClick={e => {
              this.props.onClickNode(node);
              e.stopPropagation();
            }}
          />
        ))}
      </SvgContainer>
    );
  }
}