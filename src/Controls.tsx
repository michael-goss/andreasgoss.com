import { ChangeEvent } from 'react';
import { Direction } from './interfaces';
import { normalizeDirection } from './utils';

interface ControlsProps {
  size: 'small' | 'big';
  maxSpeed: number;
  speed: number;
  setSpeed: (speed: number) => void;
  setDirection: (direction: Direction) => void;
  setFunnyFace: (val: boolean) => void;
}

export function Controls({ size, maxSpeed, speed, setSpeed, setDirection, setFunnyFace }: ControlsProps) {
  const isSmall = size === 'small';

  const onClickChangeDirection = () => {
    setDirection(normalizeDirection({ dx: Math.random() * 2 - 1, dy: Math.random() * 2 - 1 }));
  };

  const onChangeSpeed = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSpeed(parseFloat(event.target.value));
  };

  const playAudio = () => {
    const audio = document.getElementById('bellAudio');
    if (audio) {
      (audio as HTMLAudioElement).play();
    }
    setFunnyFace(true);
    setTimeout(() => setFunnyFace(false), 5000);
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
          max={maxSpeed}
          value={Math.round(speed)}
          onChange={onChangeSpeed}
        />
        {!isSmall && <span className="slider__value">{Math.round((speed / maxSpeed) * 100)}%</span>}
      </div>
      <svg className="klingel" viewBox="0 0 24 24" onClick={playAudio} xmlns="http://www.w3.org/2000/svg">
        <path
          d="m5.705 3.71-1.41-1.42C1 5.563 1 7.935 1 11h1l1-.063C3 8.009 3 6.396 5.705 3.71zm13.999-1.42-1.408 1.42C21 6.396 21 8.009 21 11l2-.063c0-3.002 0-5.374-3.296-8.647zM12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.184 4.073 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z"
          fill="green"
        />
      </svg>
    </footer>
  );
}
