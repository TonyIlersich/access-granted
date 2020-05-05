import React from 'react';
import DefaultRow from "./DefaultRow";

export default props => <DefaultRow {...props} style={{ aspectRatio: props.ratio }}/>;