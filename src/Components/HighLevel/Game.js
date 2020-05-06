import DefaultColumn from '../Containers/DefaultColumn';
import Panel from '../Containers/Panel';
import FixedAspect from '../Containers/FixedAspect.js';
import Borders from '../../Styles/Borders';
import Keyboard from '../Feedback/Keyboard';
import styled from 'styled-components';
import React from 'react';

const WideScreenContainer = styled(FixedAspect)`
  border: ${Borders.DefaultPanelBorder};
`;

export default class Game extends React.Component {
    render() {
        return (
            <WideScreenContainer ratio={16 / 9}>
                <DefaultColumn width='70%'>
                    <Panel height='60%'>
                    </Panel>
                    <Panel>
                        <Keyboard/>
                    </Panel>
                </DefaultColumn>
                <Panel/>
            </WideScreenContainer>
        );
    }
}