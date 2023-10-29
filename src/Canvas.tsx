import { useEffect, useState } from 'react';
import { Coordinates, Direction } from './interfaces';
import { MovingObject } from './MovingObject';
import { Controls } from './Controls';
import { normalizeDirection } from './utils';

export function Canvas() {
  const [canvasSize, setCanvasSize] = useState<Coordinates>();
  const [direction, setDirection] = useState<Direction>(normalizeDirection({ dx: 1, dy: 1 }));
  const [position, setPosition] = useState<Coordinates>({ x: 1, y: 1 });
  const [hasFunnyFace, setFunnyFace] = useState(false);
  const [speed, setSpeed] = useState(150);
  const size = (canvasSize?.x || 0) < 600 ? 'small' : 'big';

  useEffect(() => {
    function updateSize() {
      const canvas = document.getElementById('field');
      if (canvas) {
        setCanvasSize({
          x: canvas.offsetWidth,
          y: canvas.offsetHeight,
        });
        setPosition({ x: 1, y: 1 });
      }
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
      <main id="field" className="canvas">
        {!!canvasSize && (
          <MovingObject
            showFunnyFace={hasFunnyFace}
            size={size}
            canvasSize={canvasSize}
            speed={speed}
            position={position}
            setPosition={setPosition}
            direction={direction}
            setDirection={setDirection}
          />
        )}
      </main>
      <Controls
        size={size}
        speed={speed}
        setSpeed={setSpeed}
        setDirection={setDirection}
        setFunnyFace={setFunnyFace}
      />
    </>
  );
}
