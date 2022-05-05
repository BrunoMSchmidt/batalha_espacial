import React, { memo, useEffect, useState } from 'react';
import { spaceShip } from '../../../types/types';

type SpaceShipProps = {
  spaceShip: spaceShip,
  index: number,
  gameStateDispatcher: Function
}

const SQUARE_SIZE = 50;

const SpaceShip = memo(({ spaceShip, index, gameStateDispatcher }: SpaceShipProps) => {
  let coords: any = {};

  let wait = false;

  const getInitialCoordinates = () => {
    if (spaceShip.x && spaceShip.y) {
      return { x: spaceShip.x * SQUARE_SIZE, y: spaceShip.y * SQUARE_SIZE };
    }
    return { x: 0, y: 0 };
  };

  const [coordinates, setCoordinates] = useState(getInitialCoordinates());
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (spaceShip.isOnBoard) {
      setCoordinates({ x: (spaceShip.x || 0) * SQUARE_SIZE, y: (spaceShip.y || 0) * SQUARE_SIZE });
    } else {
      setCoordinates({ x: 0, y: 0 });
    }
  }, [isDragging, spaceShip.isOnBoard, spaceShip.x, spaceShip.y]);

  const imageWrapperStyle: React.CSSProperties = {
    position: spaceShip.isOnBoard ? 'absolute' : 'relative',
    top: coordinates.y,
    left: coordinates.x,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: isDragging ? 20 : 1,
    width: spaceShip.vertical ? `${SQUARE_SIZE * spaceShip.size}px` : `${SQUARE_SIZE}px`,
    height: spaceShip.vertical ? `${SQUARE_SIZE}px` : `${SQUARE_SIZE * spaceShip.size}px`,
  };

  const imageStyle: React.CSSProperties = {
    objectFit: 'cover',
    width: `${SQUARE_SIZE}px`,
    height: `${SQUARE_SIZE * spaceShip.size}px`,
    transform: spaceShip.vertical ? `rotate(90deg) translate(-${(spaceShip.size - 1) * SQUARE_SIZE / 2}px,${-(spaceShip.size - 1) * SQUARE_SIZE / 2}px)` : 'none',
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    switch (e.button) {
      case 0: // LEFT CLICK
        coords = {
          x: e.pageX,
          y: e.pageY,
        };
        setIsDragging(true);

        gameStateDispatcher({ type: 'SPACESHIP_START_MOVING', spaceShip });

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        break;
      case 2: // RIGHT CLICK
        if (!isDragging) {
          e.preventDefault();
          e.stopPropagation();
          gameStateDispatcher({ type: 'SPACESHIP_ROTATE', spaceShip });
        }
        break;
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    coords = {};

    const target = e.target as HTMLImageElement;
    const position = { x: target.x + SQUARE_SIZE / 2, y: target.y + SQUARE_SIZE / 2 };

    gameStateDispatcher({ type: 'SPACESHIP_DROP', position, spaceShip });
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const xDiff = coords.x - e.pageX;
    const yDiff = coords.y - e.pageY;

    coords.x = e.pageX;
    coords.y = e.pageY;

    const target = e.target as any;

    setCoordinates((prevCoords) => ({
      x: prevCoords.x - xDiff,
      y: prevCoords.y - yDiff,
    }));

    if (!wait && target && target.x && target.y) {
      // fire the event
      const position = { x: target.x + SQUARE_SIZE / 2, y: target.y + SQUARE_SIZE / 2 };
      gameStateDispatcher({ type: 'SPACESHIP_MOVE', position, spaceShip });
      // stop any further events
      wait = true;
      // after a fraction of a second, allow events again
      setTimeout(() => {
        wait = false;
      }, 1000 / 25);
    }
  };

  console.log('RENDER - spaceship ', spaceShip.size, spaceShip);

  return (
    <div draggable="false" id={`spaceship_${index}`} style={imageWrapperStyle} onMouseDown={handleMouseDown} onContextMenu={(e) => e.preventDefault()}>
      {/* <div style={{position: 'absolute', top: '-50px', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '100', pointerEvents: "none"}}>
        <h1 style={{color: 'lightgreen', WebkitTextStroke: '1.5px red'}}>
          {spaceShip.id}
          </h1>
      </div> */}
      <img draggable="false" src={spaceShip.src} alt="Spaceship" style={imageStyle} />
    </div>
  );
});

export default SpaceShip;
