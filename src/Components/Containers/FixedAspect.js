import React from 'react';
import styled from 'styled-components';
import DefaultRow from './DefaultRow';

const Container = styled(DefaultRow)`
    width: ${props => props.width && props.height ? `${Math.min(props.width, props.height * props.ratio)}px` : '100%'};
    height: ${props => props.width && props.height ? `${Math.min(props.height, props.width / props.ratio)}px` : '100%'};
    flex-grow: 0;
`;

export default class FixedAspect extends React.Component {
    state = {
        dimensions: null,
        ratio: this.props.ratio || 1,
    };

    componentDidMount() {
        this._maybeResize();
        window.addEventListener('resize', this._onWindowResize);
    }

    componentDidUpdate() {
        this._maybeResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._onWindowResize);
    }

    render() {
        return (
            <Container
                {...this.state.dimensions}
                ratio={this.state.ratio}
                ref={e => (this.container = e)}
                className={this.props.className}
            >
                {this.state.dimensions && this.props.children}
            </Container>
        );
    }

    _onWindowResize = () => this.setState({ dimensions: null });

    _maybeResize = () => {
        const dimensions = {
            width: this.container.offsetWidth,
            height: this.container.offsetHeight,
        };
        if (!this.state.dimensions) {
            this.setState({ dimensions });
        }
    }
}