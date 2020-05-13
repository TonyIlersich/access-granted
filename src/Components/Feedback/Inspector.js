import React from 'react';
import DefaultText from "../Texts/DefaultText";
import styled from "styled-components";
import Colors from "../../Styles/Colors";

const Ruler = styled.hr`
  width: 100%;
  border-color: ${Colors.Cyan};
  margin: 1.5vw 0px;
`;

export default ({ title, body, children }) => (
  <>
    <DefaultText>{title || 'This is the Inspector'}</DefaultText>
    <Ruler />
    <DefaultText>{body || 'Click on a node to see more information about it here.'}</DefaultText>
    <Ruler />
    {children}
  </>
);