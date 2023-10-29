import { ChangeEvent } from 'react';
import { Direction } from './interfaces';
import { normalizeDirection } from './utils';

interface ControlsProps {
  size: 'small' | 'big';
  speed: number;
  setSpeed: (speed: number) => void;
  setDirection: (direction: Direction) => void;
}

export function Controls({ size, speed, setSpeed, setDirection }: ControlsProps) {
  const isSmall = size === 'small';

  const onClickChangeDirection = () => {
    setDirection(normalizeDirection({ dx: Math.random() * 2 - 1, dy: Math.random() * 2 - 1 }));
  };

  const onChangeSpeed = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSpeed(parseFloat(event.target.value));
  };

  const playAudio = () => {
    const audio = new Audio('./../dist/ring.mp3');
    audio.play();
  };

  return (
    <footer className={`${isSmall ? 'footer--small' : ''}`}>
      <button
        className={`button-19 ${isSmall ? 'button--small' : ''}`}
        role="button"
        onClick={onClickChangeDirection}
      >
        Change Direction
      </button>
      <div className={`slider__group ${isSmall ? 'slider__group--small' : ''}`}>
        <label htmlFor="speed">Speed</label>
        <input
          className={`slider ${isSmall ? 'slider--small' : ''}`}
          id="speed"
          type="range"
          min="1"
          max="1000"
          value={speed}
          onChange={onChangeSpeed}
        />
        {!isSmall && <span className="slider__value">{speed / 10}%</span>}
      </div>
      <button className={`button-19 ${isSmall ? 'button--small' : ''}`} role="button" onClick={playAudio}>
        ring
      </button>
    </footer>
  );
}
