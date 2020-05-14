import React from 'react';

export default ({ color, fill, x, y, width, height, onClick }) => (
  <svg x={x} y={y} width={width} height={height} onClick={onClick} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="128" cy="128" r="120" stroke={color} strokeWidth="16" />
    <path d="M174 128C174 162.543 168.078 193.439 158.813 215.4C154.174 226.397 148.854 234.779 143.355 240.292C137.887 245.774 132.705 248 128 248C123.295 248 118.113 245.774 112.645 240.292C107.146 234.779 101.826 226.397 97.1871 215.4C87.9221 193.439 82 162.543 82 128C82 93.457 87.9221 62.5615 97.1871 40.5999C101.826 29.6031 107.146 21.2214 112.645 15.7084C118.113 10.2264 123.295 8 128 8C132.705 8 137.887 10.2264 143.355 15.7084C148.854 21.2214 154.174 29.6031 158.813 40.5999C168.078 62.5615 174 93.457 174 128Z" stroke={color} strokeWidth="16" />
    <line x1="12" y1="85" x2="244" y2="85" stroke={color} strokeWidth="16" />
    <line x1="12" y1="171" x2="244" y2="171" stroke={color} strokeWidth="16" />
    <circle cx="128" cy="128" r="124" fill={fill || 'transparent'} />
  </svg>
);