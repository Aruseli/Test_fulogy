import { interpolate } from 'react-spring';

export const changeSpeed = (st, speed = 20000, move = 600) => `translateY(${-(st * speed) + move}px)`;
