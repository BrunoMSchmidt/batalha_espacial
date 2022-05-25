import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import GameContext from '../../contexts/GameContext';
import { SpaceShip as SpaceShipType } from '../../types/types';

type SpaceShipProps = {
  spaceShip: SpaceShipType,
  index: number
}

const SQUARE_SIZE = 50;

const SpaceShip = memo(({ spaceShip, index }: SpaceShipProps) => {
  let coords: any = {};

  let wait = false;

  const [game, gameDispatcher] = useContext(GameContext);
  const [coordinates, setCoordinates] = useState(getInitialCoordinates());
  const [isDragging, setIsDragging] = useState(false);

  const imageWrapperStyle: React.CSSProperties = {
    position: spaceShip.isOnBoard ? 'absolute' : 'relative',
    top: coordinates.y,
    left: coordinates.x,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: isDragging ? 20 : 1,
    width: spaceShip.horizontal ? `${SQUARE_SIZE * spaceShip.size}px` : `${SQUARE_SIZE}px`,
    height: spaceShip.horizontal ? `${SQUARE_SIZE}px` : `${SQUARE_SIZE * spaceShip.size}px`,
  };

  const imageStyle: React.CSSProperties = {
    objectFit: 'cover',
    width: `${SQUARE_SIZE}px`,
    height: `${SQUARE_SIZE * spaceShip.size}px`,
    transform: spaceShip.horizontal ? `rotate(90deg) translate(-${(spaceShip.size - 1) * SQUARE_SIZE / 2}px,${-(spaceShip.size - 1) * SQUARE_SIZE / 2}px)` : 'none',
  };

  useEffect(() => {
    if (spaceShip.isOnBoard) {
      setCoordinates({ x: (spaceShip.x || 0) * SQUARE_SIZE, y: (spaceShip.y || 0) * SQUARE_SIZE });
    } else {
      setCoordinates({ x: 0, y: 0 });
    }
  }, [isDragging, spaceShip.isOnBoard, spaceShip.x, spaceShip.y]);

  function getInitialCoordinates() {
    if (spaceShip.x && spaceShip.y) {
      return { x: spaceShip.x * SQUARE_SIZE, y: spaceShip.y * SQUARE_SIZE };
    }
    return { x: 0, y: 0 };
  };

  function handleMouseDown(e: React.MouseEvent) {
    if(game.gameStarted) return;

    switch (e.button) {
      case 0: // LEFT CLICK
        coords = {
          x: e.pageX,
          y: e.pageY,
        };
        setIsDragging(true);

        gameDispatcher({ type: 'SPACESHIP_START_MOVING', spaceShip });

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        break;
      case 2: // RIGHT CLICK
        if (!isDragging) {
          e.preventDefault();
          e.stopPropagation();
          gameDispatcher({ type: 'SPACESHIP_ROTATE', spaceShip });
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

    gameDispatcher({ type: 'SPACESHIP_DROP', position, spaceShip });
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
      gameDispatcher({ type: 'SPACESHIP_MOVE', position, spaceShip });
      // stop any further events
      wait = true;
      // after a fraction of a second, allow events again
      setTimeout(() => {
        wait = false;
      }, 1000 / 25);
    }
  };

  return (
    <div draggable="false" id={`spaceship_${index}`} style={imageWrapperStyle} onMouseDown={handleMouseDown} onContextMenu={(e) => e.preventDefault()}>
      <img draggable="false" src={spaceShip.src} alt="Spaceship" style={imageStyle} />
    </div>
  );
});

export default SpaceShip;
