import React from 'react';

export default ({ color, fill, x, y, width, height, onClick }) => (
  <svg x={x} y={y} width={width} height={height} onClick={onClick} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="128.5" cy="207.5" r="7.5" stroke={color} stroke-width="4" />
    <rect x="76" y="32" width="104" height="192" rx="28" stroke={color} stroke-width="8" />
    <line x1="72" y1="192" x2="184" y2="192" stroke={color} stroke-width="6" />
    <line x1="72" y1="61" x2="184" y2="61" stroke={color} stroke-width="6" />
    <line x1="116" y1="48" x2="141" y2="48" stroke={color} stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="128" cy="128" r="124" stroke={color} stroke-width="8" />
    <circle cx="128" cy="128" r="124" fill={fill || 'transparent'} />
  </svg>
);