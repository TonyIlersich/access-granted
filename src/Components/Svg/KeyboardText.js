import React from 'react';
import styled from "styled-components"
import Colors from "../../Styles/Colors";

const Svg = styled.svg`
    width: 100%;
    height: 100%;
`;

const Text = styled.text`
    fill: ${Colors.Cyan};
    stroke: none;
    font-size: .8px;
`;

export default ({ className, children, width }) => (
    <Svg viewBox={`0 0 ${width || 1} 1`} className={className}>
        <Text textAnchor='middle' x={(width || 1) / 2} y={.8}>{children}</Text>
    </Svg>
);