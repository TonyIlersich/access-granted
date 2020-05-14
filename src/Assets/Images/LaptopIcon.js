import React from 'react';

export default ({ color, fill, x, y, width, height, onClick }) => (
  <svg x={x} y={y} width={width} height={height} onClick={onClick} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="128" cy="128" r="122" stroke={color} strokeWidth="12" />
    <circle cx="128" cy="128" r="122" fill={fill || 'transparent'} />
    <rect x="60" y="59" width="136" height="79" rx="10" stroke={color} strokeWidth="12" />
    <path d="M61.5445 138H194.747C195.454 138 196.109 138.374 196.469 138.984L217.713 174.984C218.499 176.317 217.538 178 215.99 178H40.083C38.5309 178 37.5703 176.309 38.3651 174.976L59.8266 138.976C60.1874 138.371 60.84 138 61.5445 138Z" stroke={color} strokeWidth="12" />
    <line x1="67" y1="158" x2="188" y2="158" stroke={color} strokeWidth="8" stroke-linecap="round" />
  </svg>
);