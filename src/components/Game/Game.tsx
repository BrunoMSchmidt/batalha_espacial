import { useReducer } from "react";
import { Link } from "react-router-dom";
import * as gameHelper from "../../utils/gameHelper";
import SpaceShips from "../SpaceShips/SpaceShips";
import { spaceShip, SquareType } from "../../types/types";
import Board from "../Board/Board";
import produce from "immer"

function gameStateReducer(state: any, action: any) {
  switch (action.type) {
    case "SPACESHIP_START_MOVING":
      return onSpaceShipStartMoving(state, action.spaceShip);
    case "SPACESHIP_MOVE":
      return onSpaceShipMove(state, action.position, action.spaceShip);
    case "SPACESHIP_DROP":
      return onSpaceShipDrop(state, action.position, action.spaceShip);
    case "SPACESHIP_ROTATE":
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
  let board = updateOccupiedSquares(state.board, state.spaceShips, spaceShip);
  return { board, spaceShips: state.spaceShips };
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

    let { start, end } = getStartAndEndCoordinates(x, y, spaceShip.size, spaceShip.vertical);

    let canDrop = true;
    for(let i = start.x; i <= end.x; i++) {
      for(let j = start.y; j <= end.y; j++){
        if(prevBoard[j][i].occupied){
          canDrop = false;
        }
      }
    }

    if(canDrop){
      let spaceShips = produce(prevSpaceShips, (draftSpaceShips: any) => {
        let spaceShipToUpdate = draftSpaceShips.find((draftSpaceShip: any) => draftSpaceShip.id === spaceShip.id);
        spaceShipToUpdate.isOnBoard = true;
        spaceShipToUpdate.x = start.x;
        spaceShipToUpdate.y = start.y;
      })
  
      let board = produce(prevBoard, (draftBoard: any) => {
        draftBoard.forEach((row: any) => row.forEach((square: any) => {
          square.occupied = false
          square.highlight = false
        }))
      }) 
  
      board = updateOccupiedSquares(board, spaceShips)
    
      return {board, spaceShips};
    } else {
      let spaceShips = produce(prevSpaceShips, (draftSpaceShips: any) => {
        let spaceShipToUpdate = draftSpaceShips.find((draftSpaceShip: any) => draftSpaceShip.id === spaceShip.id);
        spaceShipToUpdate.isOnBoard = false;
        spaceShipToUpdate.x = null;
        spaceShipToUpdate.y = null;
      })
  
      let board = produce(prevBoard, (draftBoard: any) => {
        draftBoard.forEach((row: any) => row.forEach((square: any) => {
          square.occupied = false
          square.highlight = false
        }))
      }) 

      board = updateOccupiedSquares(board, spaceShips);
      return {
        board,
        spaceShips
      };
    }
  } else {
    let spaceShips = produce(prevSpaceShips, (draftSpaceShips: any) => {
      let spaceShipToUpdate = draftSpaceShips.find((draftSpaceShip: any) => draftSpaceShip.id === spaceShip.id);
      spaceShipToUpdate.isOnBoard = false;
      spaceShipToUpdate.x = null;
      spaceShipToUpdate.y = null;
    })

    let board = updateOccupiedSquares(prevBoard, spaceShips);
    return {
      board,
      spaceShips
    };
  }
};

const updateOccupiedSquares = (board: any, spaceShips: any, exception?: spaceShip) => {
  return produce(board, (draftBoard: any) => {
    for(let i = 0; i <= 9; i++){
      for(let j = 0; j <= 9; j++){
        if(draftBoard[i][j].occupied){
          draftBoard[i][j] = { ...draftBoard[i][j], occupied: false };
        }
      }
    }

    spaceShips.filter(({isOnBoard, id}: spaceShip) => isOnBoard && (exception ? id !== exception.id : true)).forEach(({id, vertical, x, y, size}: spaceShip) => {
      if(x === null || y === null) return;
      
      if(vertical){
        for(let i = x; i < x + size; i++){
          if(i < 10 && y < 10){
            draftBoard[y][i] = {...draftBoard[y][i], occupied: id}
          }
        }
      } else {
        for(let i = y; i < y + size; i++){
          if(i < 10 && x < 10){
            draftBoard[i][x] = {...draftBoard[i][x], occupied: id}
          }
        }
      }
    })
  })
}

const getStartAndEndCoordinates = (x: number, y: number, size: number, vertical: boolean) => {
  let start = {x, y};
  let end = {x, y}
  if(vertical){
    start.x = x >= (10 - size) ? (10 - size) : x;
    end.x = Math.min(9, x + size - 1);
  } else {
    start.y = y >= (10 - size) ? (10 - size) : y;
    end.y = Math.min(9, y + size - 1);
  }

  return { start, end };
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

    
    let nextBoard = produce(board, (draftBoard: SquareType[][]) => {
      
      let { start, end } = getStartAndEndCoordinates(x, y, spaceShip.size, spaceShip.vertical);

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (
            j >= start.x && j <= end.x && i >= start.y && i <= end.y
          ) {
            draftBoard[i][j].highlight = true;
          } else {
            draftBoard[i][j].highlight = false;
          }
        }
      }
    })

    return { ...state, board: nextBoard };
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

  let board: any = updateOccupiedSquares(state.board, state.spaceShips, spaceShip);

  let canDrop = true;
  
  if(spaceShip.isOnBoard){
    let { start, end } = getStartAndEndCoordinates(spaceShip.x, spaceShip.y, spaceShip.size, !spaceShip.vertical);
    
    for(let i = start.x; i <= end.x; i++) {
      for(let j = start.y; j <= end.y; j++){
        if(board[j][i].occupied){
          canDrop = false;
        }
      }
    }
  }
    
  return produce(state, (draftState: any) => {
    let spaceShipToUpdate = draftState.spaceShips.find((draftSpaceShip: any) => draftSpaceShip.id === spaceShip.id);
    if(canDrop) {
      spaceShipToUpdate.vertical = !spaceShipToUpdate.vertical;
    }

    draftState.board = updateOccupiedSquares(draftState.board, draftState.spaceShips);
  })
}

function Game() {
  const [game, gameStateDispatcher] = useReducer(
    gameStateReducer,
    gameHelper.getGameInitialState()
  );

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
