import { useEffect } from 'react';
import { Coordinates, Direction } from './interfaces';

interface MovingObjectProps {
  size: 'big' | 'small';
  canvasSize: Coordinates;
  speed: number;
  position: Coordinates;
  setPosition: React.Dispatch<React.SetStateAction<Coordinates>>;
  direction: Direction;
  setDirection: React.Dispatch<React.SetStateAction<Direction>>;
  showFunnyFace: boolean;
}

export function MovingObject({
  size,
  canvasSize,
  speed,
  position,
  setPosition,
  direction,
  setDirection,
  showFunnyFace,
}: MovingObjectProps) {
  const playerDiameter = size === 'big' ? 400 : 240;
  const playerBorder = size === 'big' ? 30 : 20;

  const move = (position: Coordinates, direction: Direction): Coordinates => {
    return { x: position.x + direction.dx, y: position.y - direction.dy };
  };

  const hitsWindow = (position: Coordinates, windowLimits: Coordinates): boolean[] => {
    return [
      position.y < 0, // top
      position.x + playerDiameter > windowLimits.x, // right
      position.y + playerDiameter > windowLimits.y, // bottom
      position.x < 0, // left
    ];
  };

  const getPlayerRotation = (direction: Direction): number => {
    const blub = direction.dx > 0 ? 90 : 270;
    return (Math.atan2(direction.dx, direction.dy) * 180) / Math.PI - blub;
  };

  const bounce = (direction: Direction, hitPositions: boolean[]): Direction => {
    let newDirection = direction;
    if (hitPositions.some((pos) => pos)) {
      if (hitPositions[0] || hitPositions[2]) {
        // bounce from top or bottom
        newDirection.dy *= -1;
      } else if (hitPositions[1] || hitPositions[3]) {
        // bounce from left or right
        newDirection.dx *= -1;
      }
    }
    return newDirection;
  };

  const stepForward = () => {
    // calculate next position
    let nextPosition = move(position, direction);
    // check if next position would hit the window limit
    const hitPositions = hitsWindow(nextPosition, canvasSize);

    if (hitPositions.some((pos) => pos)) {
      // adjust direction when we're going to hit the window limit
      const newDirection = bounce(direction, hitPositions);
      setDirection(newDirection);
      nextPosition = move(position, newDirection);
    }
    setPosition({ x: nextPosition.x, y: nextPosition.y });
  };

  useEffect(() => {
    setTimeout(stepForward, 1000 / speed);
  }, [direction, position]);

  return (
    <img
      src={showFunnyFace ? './andi_lustig.png' : './andi.png'}
      width={playerDiameter - playerBorder}
      height={playerDiameter - playerBorder}
      className={`movingObject ${size === 'small' ? 'movingObject--small' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        rotate: `${getPlayerRotation(direction)}deg`,
        transform: `scaleX(${direction.dx > 0 ? -1 : 1})`,
      }}
    />
  );
}
