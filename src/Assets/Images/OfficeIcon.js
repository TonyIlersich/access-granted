import React from 'react';

export default ({ color, fill, x, y, width, height, onClick }) => (
  <svg x={x} y={y} width={width} height={height} onClick={onClick} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="128" cy="128" r="122" stroke={color} strokeWidth="12" />
    <circle cx="128" cy="128" r="122" fill={fill || 'transparent'} />
    <rect x="76" y="31" width="104" height="175" rx="10" stroke={color} strokeWidth="12" />
    <mask id="path-4-inside-1" fill={color}>
      <rect x="58" y="193" width="140" height="24" rx="3" />
    </mask>
    <rect x="58" y="193" width="140" height="24" rx="3" stroke={color} strokeWidth="24" mask="url(#path-4-inside-1)" />
    <rect x="94" y="49" width="12" height="24" rx="2" fill={color} />
    <rect x="94" y="85" width="12" height="24" rx="2" fill={color} />
    <rect x="94" y="121" width="12" height="24" rx="2" fill={color} />
    <rect x="94" y="157" width="12" height="24" rx="2" fill={color} />
    <rect x="122" y="49" width="12" height="24" rx="2" fill={color} />
    <rect x="122" y="85" width="12" height="24" rx="2" fill={color} />
    <rect x="122" y="121" width="12" height="24" rx="2" fill={color} />
    <rect x="122" y="157" width="12" height="24" rx="2" fill={color} />
    <rect x="150" y="49" width="12" height="24" rx="2" fill={color} />
    <rect x="150" y="85" width="12" height="24" rx="2" fill={color} />
    <rect x="150" y="121" width="12" height="24" rx="2" fill={color} />
    <rect x="150" y="157" width="12" height="24" rx="2" fill={color} />
  </svg>
);