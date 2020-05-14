import React from 'react';

export default ({ color, fill, x, y, width, height, onClick }) => (
  <svg x={x} y={y} width={width} height={height} onClick={onClick} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="208" cy="208" r="12" stroke={color} stroke-width="8" />
    <rect x="36" y="196" width="92" height="24" rx="4" stroke={color} stroke-width="8" />
    <rect x="20" y="180" width="216" height="56" rx="12" stroke={color} stroke-width="8" />
    <circle cx="208" cy="128" r="12" stroke={color} stroke-width="8" />
    <rect x="36" y="116" width="92" height="24" rx="4" stroke={color} stroke-width="8" />
    <rect x="20" y="100" width="216" height="56" rx="12" stroke={color} stroke-width="8" />
    <circle cx="208" cy="48" r="12" stroke={color} stroke-width="8" />
    <rect x="36" y="36" width="92" height="24" rx="4" stroke={color} stroke-width="8" />
    <rect x="20" y="20" width="216" height="56" rx="12" stroke={color} stroke-width="8" />
    <rect x="4" y="4" width="248" height="248" rx="20" stroke={color} stroke-width="8" />
    <rect x="4" y="4" width="248" height="248" rx="20" fill={fill || 'transparent'} />
  </svg>
);