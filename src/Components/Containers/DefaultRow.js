import styled from "styled-components";

export default styled.div`
    margin: 0px;
    border: 0px;
    padding: 0px;
    width: ${props => props.width || 'auto'};
    max-width: ${props => props.width || 'none'};
    height: ${props => props.height || 'auto'};
    max-height: ${props => props.height || 'none'};
    display: flex;
    flex-grow: 1;
    flex-shrink: 0;
    box-sizing: border-box;
`;