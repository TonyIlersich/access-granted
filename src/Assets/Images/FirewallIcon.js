import React from 'react';

export default ({ color, fill, x, y, width, height, onClick }) => (
  <svg x={x} y={y} width={width} height={height} onClick={onClick} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5.5" y="5.5" width="245" height="245" rx="10.5" stroke={color} stroke-width="11" />
    <rect x="5.5" y="5.5" width="245" height="245" rx="10.5" fill={fill || 'transparent'} />
    <rect x="5.5" y="54.5" width="245" height="49" stroke={color} stroke-width="11" />
    <rect x="5.5" y="152.5" width="245" height="49" stroke={color} stroke-width="11" />
    <line x1="128" y1="11" x2="128" y2="49" stroke={color} stroke-width="8" />
    <line x1="128" y1="109" x2="128" y2="147" stroke={color} stroke-width="8" />
    <line x1="128" y1="207" x2="128" y2="245" stroke={color} stroke-width="8" />
    <line x1="64" y1="60" x2="64" y2="98" stroke={color} stroke-width="8" />
    <line x1="192" y1="60" x2="192" y2="98" stroke={color} stroke-width="8" />
    <line x1="64" y1="158" x2="64" y2="196" stroke={color} stroke-width="8" />
    <line x1="192" y1="158" x2="192" y2="196" stroke={color} stroke-width="8" />
  </svg>
);