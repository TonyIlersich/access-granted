import React from 'react';
import Colors from '../../Styles/Colors';
import styled from 'styled-components';

const Circle = styled.circle`
  stroke: ${Colors.DefaultStroke};
  fill: ${Colors.DefaultFill};
`;

export default ({ x, y, r, onClick }) => (
  <Circle cx={x} cy={y} r={r} onClick={onClick} />
);