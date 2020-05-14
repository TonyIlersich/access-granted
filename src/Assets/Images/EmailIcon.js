import React from 'react';

export default ({ color, fill, x, y, width, height, onClick }) => (
  <svg x={x} y={y} width={width} height={height} onClick={onClick} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="32" y="60" width="192" height="136" rx="20" stroke={color} stroke-width="8" />
    <line x1="39.333" y1="67.2972" x2="127.676" y2="155.64" stroke={color} stroke-width="8" stroke-linecap="round" />
    <line x1="158.239" y1="129.297" x2="217.582" y2="188.64" stroke={color} stroke-width="8" stroke-linecap="round" />
    <line x1="128" y1="155.64" x2="217.343" y2="66.2971" stroke={color} stroke-width="8" stroke-linecap="round" />
    <line x1="38.3125" y1="189.277" x2="96.6556" y2="130.933" stroke={color} stroke-width="8" stroke-linecap="round" />
    <circle cx="128" cy="128" r="124" stroke={color} stroke-width="8" />
    <circle cx="128" cy="128" r="124" fill={fill || 'transparent'} />
  </svg>
);