import { Direction } from './interfaces';

export function normalizeDirection(direction: Direction): Direction {
  const magnitude = Math.sqrt(direction.dx ** 2 + direction.dy ** 2);
  return { dx: direction.dx / magnitude, dy: direction.dy / magnitude };
}
