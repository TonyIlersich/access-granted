import React from 'react';
import styled from 'styled-components';
import DefaultColumn from './Components/Containers/DefaultColumn';
import DefaultRow from './Components/Containers/DefaultRow';
import DefaultText from './Components/Texts/DefaultText';
import Panel from './Components/Containers/Panel';
import FixedAspectContainer from './Components/Containers/FixedAspectContainer.js';

const AppContainer = styled(DefaultRow)`
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

export default () => (
  <AppContainer>
    <FixedAspectContainer ratio={16 / 9}>
      <DefaultColumn width='70%'>
        <Panel height='60%'>
          <DefaultText>Hello World</DefaultText>
        </Panel>
        <Panel/>
      </DefaultColumn>
      <Panel/>
    </FixedAspectContainer>
  </AppContainer>
);
