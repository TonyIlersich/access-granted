import React from 'react';
import styled from "styled-components";
import DefaultText from "../Texts/DefaultText";
import Borders from "../../Styles/Borders";

export const Text = styled(DefaultText)`
  box-sizing: border-box;
  border: ${Borders.DefaultPanelBorder};
  text-align: center;
  font-size: 2.5vw;
  font-weight: 600;
  padding: 4px;
  margin: .5vw;
  letter-spacing: 4px;
`;

export default class Timer extends React.Component {
  state = {
    time: this.props.time,
    interval: this.props.interval || .01,
  };

  componentDidMount() {
    console.log('mount');
    this._timer = setInterval(() => {
      if (this.state.time === 0) {
        this.props.onTimeEnd();
        clearInterval(this._timer);
      } else {
        this.setState({ time: Math.max(0, this.state.time - this.state.interval) })
      }
    }, this.state.interval * 1000);
  }

  componentWillUnmount() {
    this._timer && clearInterval(this._timer);
  }

  render() {
    return (
      <Text>
        {
          Math.floor(this.state.time / 60).toString().padStart(2, '0')
        }:{
          (this.state.time % 60)
            .toFixed(this.state.interval < 1 ? 2 : 0)
            .padStart(2 + (this.state.interval < 1 ? 3 : 0), '0')
        }
      </Text>
    );
  }
}