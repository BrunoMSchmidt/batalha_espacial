import { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import * as gameHelper from "../../utils/gameHelper";
import SpaceShips from "../SpaceShips/SpaceShips";
import { spaceShip } from "../../types/types";
import Board from "../Board/Board";

function gameStateReducer(state: any, action: any) {
  switch (action.type) {
    case "SPACESHIP_START_MOVING":
      return onSpaceShipStartMoving(state, action.spaceShip);
    case "SPACESHIP_MOVE":
      return onSpaceShipMove(state, action.position, action.spaceShip);
    case "SPACESHIP_DROP":
      return onSpaceShipDrop(state, action.position, action.spaceShip);
    case "SPACESHIP_ROTATE":
      console.log('right 2')
      return onSpaceShipRotate(state, action.spaceShip);
    default:
      throw new Error();
  }
}

const getSquareByCoordinates = (
  x: number,
  y: number
): { x: number; y: number } | null => {
  if (!x || !y) {
    return null;
  }
  const elementBelow = document
    .elementsFromPoint(x, y)
    .find((element) => element.classList.contains("droppable"));
  if (elementBelow) {
    const parent = elementBelow!.parentElement!;
    const x = Array.from(parent.children).indexOf(elementBelow);
    const y = Array.from(parent.parentNode!.children).indexOf(parent);

    if (typeof x === "number" && typeof y === "number") {
      return { x, y };
    }
  }
  return null;
};

const onSpaceShipStartMoving = (state: any, spaceShip: any) => {
  const { board, spaceShips } = state;
  updateOccupiedSquares(board, spaceShips, spaceShip);
  return {board, spaceShips };
}

const onSpaceShipDrop = (
  state: any,
  position: { x: number; y: number },
  spaceShip: spaceShip
): any => {
  const { board: prevBoard, spaceShips: prevSpaceShips } = state;

  const squareCoordinates = getSquareByCoordinates(position.x, position.y);
  if (squareCoordinates) {
    const { x, y } = squareCoordinates;

    let spaceShips = prevSpaceShips.map((prevSpaceShip: any) => {
      if (prevSpaceShip.id === spaceShip.id) {
        return { ...prevSpaceShip, x, y, isOnBoard: true };
      } else {
        return prevSpaceShip;
      }
    });
    let board = prevBoard.map((row: any, i: any) => row.map((square: any, j: any) => {
      let auxSquare = square;
      if(auxSquare.occupied){
        auxSquare = {...auxSquare, occupied: false}
      }
      if(auxSquare.highlight){
        auxSquare = {...square, highlight: false};
      } 
      return auxSquare;
    }));

    updateOccupiedSquares(board, spaceShips)

    const obj = {
      board,
      spaceShips
    }
  
    return obj;
  } else {
    let board = [...prevBoard];
    let spaceShips = prevSpaceShips.map((prevSpaceShip: any) => {
      if (prevSpaceShip.id === spaceShip.id) {
        return { ...prevSpaceShip, x: null, y: null, isOnBoard: false };
      } else {
        return prevSpaceShip;
      }
    });

    updateOccupiedSquares(board, spaceShips);
    return {
      board,
      spaceShips
    };
  }
};

const updateOccupiedSquares = (board: any, spaceShips: any, exception?: spaceShip) => {
  for(let i = 0; i <= 9; i++){
    for(let j = 0; j <= 9; j++){
      if(board[i][j].occupied){
        board[i][j] = { ...board[i][j], occupied: false };
      }
    }
  }
  spaceShips.filter(({isOnBoard, id}: spaceShip) => isOnBoard && (exception ? id !== exception.id : true)).forEach(({id, vertical, x, y, size}: spaceShip) => {
    if(x === null || y === null) return;

    if(vertical){
      for(let i = x; i < x + size; i++){
        if(i < 10 && y < 10){
          board[y][i] = {...board[y][i], occupied: true}
        }
      }
    } else {
      for(let i = y; i < y + size; i++){
        if(i < 10 && x < 10){
          board[i][x] = {...board[i][x], occupied: true}
        }
      }
    }
  })
}

const onSpaceShipMove = (
  state: any,
  position: { x: number; y: number },
  spaceShip: spaceShip
): any => {
  if (isNaN(position.x) || isNaN(position.y)) {
    return state;
  }

  const squareCoordinate = getSquareByCoordinates(position.x, position.y);

  const { board, spaceShips } = state;

  if (squareCoordinate) {
    const { x, y } = squareCoordinate;

    let arr = [];
    for (let i = 0; i < board.length; i++) {
      let row = [];
      for (let j = 0; j < board[i].length; j++) {
        if (
          spaceShip.vertical
            ? i === y && j >= x && j < x + spaceShip.size
            : i >= y && i < y + spaceShip.size && j === x
        ) {
          console.log('entrou');
          row.push({ ...board[i][j], highlight: true });
        } else {
          row.push({ ...board[i][j], highlight: false });
        }
      }
      arr.push(row);
    }

    return { ...state, board: arr };
  } else {
    if (board.some((row: any) => row.some((square: any) => square.highlight))) {
      let arr = [];
      for (let i = 0; i < board.length; i++) {
        let row = [];
        for (let j = 0; j < board[i].length; j++) {
          row.push({ ...board[i][j], highlight: false });
        }
        arr.push(row);
      }
      return { ...state, board: arr };
    }
    return state;
  }
};

const onSpaceShipRotate = (state: any, spaceShip: any) => {
  return (
    {
      ...state,
      spaceShips: state.spaceShips.map((prevSpaceShip: any) => {
        if(prevSpaceShip.id === spaceShip.id){
          return {...prevSpaceShip, vertical: !prevSpaceShip.vertical}
        } else {
          return prevSpaceShip
        }
      })
    }
  )
}

function Game() {
  const [game, gameStateDispatcher] = useReducer(
    gameStateReducer,
    gameHelper.getGameInitialState()
  );

  console.log(`RENDER - Game.`);
  return (
    <div>
      <h1>Jogo</h1>
      <div style={{ display: "flex", justifyContent: "center", width: '100%', alignItems: 'flex-start' }}>
        <Board
          board={game.board}
          spaceShips={game.spaceShips}
          gameStateDispatcher={gameStateDispatcher}
        />
        <SpaceShips
          gameStateDispatcher={gameStateDispatcher}
          spaceShips={game.spaceShips}
        />
      </div>
      <Link to={"../"}>Voltar</Link>
    </div>
  );
}

export default Game;
