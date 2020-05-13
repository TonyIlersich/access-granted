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
            <SvgContainer viewBox='-200 -100 400 200' onClick={this.props.onDeselect}>
                {this.props.map._nodes.map(node => (
                    <MapNode key={node.id} x={node.x * this._scale} y={node.y * this._scale} r={this._scale * this._nodeRadius} onClick={e => {
                        this.props.onClickNode(node);
                        e.stopPropagation();
                    }} />
                ))}
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
            </SvgContainer>
        );
    }
}