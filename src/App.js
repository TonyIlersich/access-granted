import React from 'react';
import styled from 'styled-components';
import DefaultContainer from './Components/Containers/DefaultContainer';
import DefaultText from './Components/Texts/DefaultText';

const AppContainer = styled(DefaultContainer)`
  position: fixed;
  margin: 0px;
  border: 0px;
  padding: 0px;
  width: 100vw;
  height: 100vh;
`;

export default () => (
  <AppContainer>
    <DefaultText>Hello World</DefaultText>
  </AppContainer>
);
