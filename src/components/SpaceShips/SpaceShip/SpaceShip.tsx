import React, { memo, useEffect, useState } from "react";
import { spaceShip } from "../../../types/types";

type SpaceShipProps = {
  spaceShip: spaceShip,
  index: number,
  gameStateDispatcher: Function
}

const SpaceShip = memo(function SpaceShip({spaceShip, index, gameStateDispatcher}: SpaceShipProps){

  let coords: any = {}

  let wait = false;

  const getInitialCoordinates = () => {
    // console.log()
    if(spaceShip.x && spaceShip.y){
      return {x: spaceShip.x * 65, y: spaceShip.y *65};
    } else {
      return {x: 0, y: 0};
    }
  }

  const [coordinates, setCoordinates] = useState(getInitialCoordinates());
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if(spaceShip.isOnBoard){
      console.log('abd',{ x: (spaceShip.x || 0) * 65, y: (spaceShip.y || 0) * 65});
      setCoordinates({ x: (spaceShip.x || 0) * 65, y: (spaceShip.y || 0) * 65})
    } else {
      setCoordinates({ x: 0, y: 0});
    }
  }, [isDragging, spaceShip.isOnBoard, spaceShip.x, spaceShip.y])

  const imageWrapperStyle: React.CSSProperties = {
    position: spaceShip.isOnBoard ? 'absolute' : 'relative',
    top: coordinates.y,
    left: coordinates.x,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: isDragging ? 20 : 1,
    width: spaceShip.vertical ? 65 * spaceShip.size + 'px' : '65px',
    height: spaceShip.vertical ? '65px' : 65 * spaceShip.size + 'px'
  }

  const imageStyle: React.CSSProperties = {
    objectFit: 'cover',
    width: '65px',
    height: 65 * spaceShip.size + 'px',
    transform: spaceShip.vertical ? `rotate(90deg) translate(-${(spaceShip.size - 1) * 65/2}px,${-(spaceShip.size - 1) * 65/2}px)` : 'none'
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    switch(e.button){
      case 0: // LEFT CLICK
        coords = {
          x: e.pageX,
          y: e.pageY
        }
        setIsDragging(true);
    
        console.log(e);
        gameStateDispatcher({ type: 'SPACESHIP_START_MOVING', spaceShip }); 
    
        console.log("ADICIONOU EVENTOS");
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        break;
      case 2: // RIGHT CLICK
        console.log('right');
        gameStateDispatcher({ type: 'SPACESHIP_ROTATE', spaceShip }); 
        break;
    }
    
  };
  
  const handleMouseUp = (e: MouseEvent) => {
    console.log("LIMPOU EVENTOS");
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    coords = {};
    
    const target = e.target as HTMLImageElement;
    const position = {x: target.x + 65/2 , y: target.y + 65/2};
    
    gameStateDispatcher({ type: 'SPACESHIP_DROP', position, spaceShip});
    setIsDragging(false);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    const xDiff = coords.x - e.pageX;
    const yDiff = coords.y - e.pageY;

    coords.x = e.pageX;
    coords.y = e.pageY;

    const target = e.target as any;

    setCoordinates(prevCoords => ({
      x: prevCoords.x - xDiff,
      y: prevCoords.y - yDiff
    }))

    if (!wait && target && target.x && target.y) {
      // fire the event
      let position = {x: target.x + 65/2 , y: target.y + 65/2};
      // console.log(position);
      gameStateDispatcher({type: 'SPACESHIP_MOVE', position , spaceShip})
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
    <div draggable="false" id={`spaceship_${index}`} style={imageWrapperStyle} onMouseDown={handleMouseDown}>
      {/* <div style={{position: 'absolute', top: '-50px', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '100', pointerEvents: "none"}}>
        <h1 style={{color: 'lightgreen', WebkitTextStroke: '1.5px red'}}>
          {JSON.stringify(coordinates)}
          <br />
          {isDragging ? 'Dragging': ''}
          </h1>
      </div> */}
      <img draggable="false" src={spaceShip.src} alt="Spaceship" style={imageStyle}/>
    </div>  
  )
})

export default SpaceShip;