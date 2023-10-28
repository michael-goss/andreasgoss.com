import { useEffect, useState } from 'react';
import { Coordinates, Direction } from './interfaces';
import { MovingObject } from './MovingObject';
import { Controls } from './Controls';
import { normalizeDirection } from './utils';

export function Canvas() {
  const [canvasSize, setCanvasSize] = useState<Coordinates>();
  const [direction, setDirection] = useState<Direction>(normalizeDirection({ dx: 1, dy: 1 }));
  const [position, setPosition] = useState<Coordinates>({ x: 100, y: 100 });
  const [speed, setSpeed] = useState(400);

  useEffect(() => {
    function updateSize() {
      const canvas = document.getElementById('field');
      if (canvas) {
        setCanvasSize({
          x: canvas.offsetWidth,
          y: canvas.offsetHeight,
        });
      }
    }
    // Call the function to set the initial size
    updateSize();
    // Add an event listener to update the size on window resize
    window.addEventListener('resize', updateSize);
    // Cleanup function to remove the event listener when the component unmounts
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
      <main id="field" className="canvas">
        {!!canvasSize && (
          <MovingObject
            canvasSize={canvasSize}
            speed={speed}
            position={position}
            setPosition={setPosition}
            direction={direction}
            setDirection={setDirection}
          />
        )}
      </main>
      <Controls speed={speed} setSpeed={setSpeed} setDirection={setDirection} />
    </>
  );
}
