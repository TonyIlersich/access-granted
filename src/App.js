import React from 'react';
import styled from 'styled-components';
import DefaultRow from './Components/Containers/DefaultRow';
import Colors from './Styles/Colors';
import Game from './Components/Smart/Game';

const AppContainer = styled(DefaultRow)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  background-color: ${Colors.Black};
`;

export default () => (
  <AppContainer>
    <Game/>
  </AppContainer>
);
