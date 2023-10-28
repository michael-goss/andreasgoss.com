import { ChangeEvent } from 'react';
import { Direction } from './interfaces';
import { normalizeDirection } from './utils';

interface ControlsProps {
  speed: number;
  setSpeed: (speed: number) => void;
  setDirection: (direction: Direction) => void;
}

export function Controls({ speed, setSpeed, setDirection }: ControlsProps) {
  const onClickChangeDirection = () => {
    setDirection(normalizeDirection({ dx: Math.random() * 2 - 1, dy: Math.random() * 2 - 1 }));
  };

  const onChangeSpeed = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSpeed(parseFloat(event.target.value));
  };

  return (
    <footer>
      <button onClick={onClickChangeDirection}>Change Direction</button>
      <input id="speed" type="range" min="1" max="1000" value={speed} onChange={onChangeSpeed} />
    </footer>
  );
}
