import React from 'react';
import Colors from "../../Styles/Colors";
import styled from "styled-components";
import SvgText from '../Svg/SvgText';
import Margins from '../../Styles/Margins';
import DefaultRow from '../Containers/DefaultRow';

const Container = styled(DefaultRow)`
    flex-grow: ${props => props.width || 1};
    flex-shrink: ${props => props.width || 1};
    flex-basis: 0;
    border: 2px solid ${Colors.Cyan};
    & ~ & {
        margin-left: ${Margins.KeyMargin};
    }
`;

const Text = styled(SvgText)`
    color: ${props => props.color || Colors.Cyan};
    flex-grow: 1;
    font-size: 100%;
`;

export default props => (
    <Container width={props.width}>
        <Text {...props}>{props.label}</Text>
    </Container>
);