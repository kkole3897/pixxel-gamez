import { style, styleVariants, createVar } from '@vanilla-extract/css';
import {  } from '@vanilla-extract/dynamic';

export const container = style({
  position: 'relative',
  width: '38px',
  height: '38px',
});

export const outerOrb = style({
  position: 'absolute',
  top: '-1px',
  right: '-1px',
  bottom: '-1px',
  left: '-1px',
  borderRadius: '50%',
  background: '#2e2e2e',
  zIndex: -1,
});

export const innerOrb = style({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '4px',
  right: '4px',
  bottom: '4px',
  left: '4px',
  borderRadius: '50%',
  background: '#2e2e2e',
  color: '#fff',
});

export const radialTransform = createVar();

export const radial = style({
  borderRadius: '50%',
  transform: radialTransform,
});

export const circleDashArray = createVar();

const circle = style({
  strokeDasharray: circleDashArray,
});

export const colorCircle = styleVariants({
  Mighty: [
    circle,
    {
      fill: '#fc430a',
    },
  ],
  Strong: [
    circle,
    {
      fill: '#9e00b4',
    },
  ],
  Fair: [
    circle,
    {
      fill: '#4aa1ce',
    },
  ],
  Weak: [
    circle,
    {
      fill: '#80b06a',
    },
  ],
});
