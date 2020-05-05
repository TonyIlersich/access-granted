import React from 'react';
import styled from 'styled-components';
import DefaultColumn from './Components/Containers/DefaultColumn';
import DefaultRow from './Components/Containers/DefaultRow';
import DefaultText from './Components/Texts/DefaultText';
import Panel from './Components/Containers/Panel';
import FixedAspect from './Components/Containers/FixedAspect.js';
import Colors from './Styles/Colors';
import Borders from './Styles/Borders';

const AppContainer = styled(DefaultRow)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  background-color: ${Colors.Black};
`;

const FixedAspectContainer = styled(FixedAspect)`
  border: ${Borders.DefaultPanelBorder};
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
