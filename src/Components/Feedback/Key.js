import React from 'react';
import Colors from "../../Styles/Colors";
import styled from "styled-components";
import SvgText from '../Svg/KeyboardText';
import Margins from '../../Styles/Margins';
import DefaultRow from '../Containers/DefaultRow';

const Container = styled(DefaultRow)`
  flex-grow: ${props => props.width || 1};
  flex-shrink: ${props => props.width || 1};
  background-color: ${props => props.bgColor || 'transparent'};
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

export default class Key extends React.Component {
  state = {
    bgColor: null
  };

  componentDidMount() {
    document.addEventListener('keydown', this._onKeyPress);
    document.addEventListener('keyup', this._onKeyRelease);
  }

  componentWillMount() {
    document.removeEventListener('keydown', this._onKeyPress);
    document.removeEventListener('keyup', this._onKeyRelease);
  }

  render() {
    return (
      <Container width={this.props.width} bgColor={this.state.bgColor}>
        <Text {...this.props}>{this.props.label}</Text>
      </Container>
    );
  }

  _onKeyPress = e => {
    if (this.props.label && e.key.toLowerCase() === this.props.label.toLowerCase()) {
      this.setState({ bgColor: Colors.HalfCyan });
    }
  }

  _onKeyRelease = e => {
    if (this.props.label && e.key.toLowerCase() === this.props.label.toLowerCase()) {
      this.setState({ bgColor: null });
    }
  }
}