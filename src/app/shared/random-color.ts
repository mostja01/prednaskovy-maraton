import constants from './utils';

export function randomColor() {
  return constants.COLORS[Math.floor(Math.random() * constants.COLORS.length)];
}
