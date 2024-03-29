import React from 'react';

export default ({ color, fill, x, y, width, height, onClick }) => (
  <svg x={x} y={y} width={width} height={height} onClick={onClick} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="192" cy="192" r="16" stroke={color} strokeWidth="8" />
    <circle cx="144" cy="192" r="16" stroke={color} strokeWidth="8" />
    <circle cx="96" cy="192" r="16" stroke={color} strokeWidth="8" />
    <rect x="32" y="160" width="192" height="64" rx="12" stroke={color} strokeWidth="8" />
    <path d="M168 156C168 150.696 170.107 145.609 173.858 141.858C177.609 138.107 182.696 136 188 136C193.304 136 198.391 138.107 202.142 141.858C205.893 145.609 208 150.696 208 156" stroke={color} strokeWidth="8" />
    <line x1="188" y1="132" x2="188" y2="67" stroke={color} strokeWidth="8" strokeLinecap="round" />
    <path d="M177.393 78.6066C175.296 76.5088 173.867 73.8361 173.288 70.9264C172.709 68.0166 173.006 65.0006 174.142 62.2597C175.277 59.5189 177.2 57.1762 179.666 55.528C182.133 53.8797 185.033 53 188 53C190.967 53 193.867 53.8797 196.334 55.528C198.8 57.1762 200.723 59.5189 201.858 62.2597C202.994 65.0006 203.291 68.0166 202.712 70.9264C202.133 73.8361 200.704 76.5088 198.607 78.6066" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M169.615 86.3848C165.979 82.7486 163.503 78.1159 162.5 73.0723C161.496 68.0288 162.011 62.8011 163.979 58.0502C165.947 53.2994 169.279 49.2387 173.555 46.3818C177.831 43.5249 182.858 42 188 42C193.142 42 198.169 43.5249 202.445 46.3818C206.721 49.2387 210.053 53.2994 212.021 58.0502C213.989 62.8011 214.504 68.0288 213.5 73.0723C212.497 78.1159 210.021 82.7486 206.385 86.3848" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d="M161.13 94.8701C155.816 89.5557 152.196 82.7847 150.73 75.4134C149.264 68.0422 150.016 60.4016 152.893 53.458C155.769 46.5144 160.639 40.5796 166.888 36.4042C173.137 32.2287 180.484 30 188 30C195.516 30 202.863 32.2287 209.112 36.4042C215.361 40.5796 220.231 46.5144 223.107 53.458C225.984 60.4016 226.736 68.0422 225.27 75.4134C223.804 82.7847 220.184 89.5557 214.87 94.8701" stroke={color} strokeWidth="4" strokeLinecap="round" />
    <rect x="4" y="4" width="247.999" height="247.999" rx="28" stroke={color} strokeWidth="8" />
    <rect x="4" y="4" width="247.999" height="247.999" rx="28" fill={fill || 'transparent'} />
  </svg>
);