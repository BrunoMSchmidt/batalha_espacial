import { createContext, Dispatch } from "react";
import { useParams } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import { GameState, SpaceShip, Square } from "../types/types";
import * as gameHelper from "../utils/gameHelper";

// @ts-ignore
export const GameStateContext = createContext<GameState>(null);
// @ts-ignore
export const GameDispatcherContext = createContext<Dispatch<any>>(null);

export const GameContextProvider = ({ children }: any) => {
  let { opponent } = useParams();
  if (opponent !== "player" && opponent !== "computer") {
    return <></>;
  }

  function gameStateReducer(state: GameState, action: any) {
    switch (action.type) {
      case "SPACESHIP_START_MOVING":
        onSpaceShipStartMoving(state, action.spaceShip);
        break;
      case "SPACESHIP_MOVE":
        onSpaceShipMove(state, action.position, action.spaceShip);
        break;
      case "SPACESHIP_DROP":
        onSpaceShipDrop(state, action.position, action.spaceShip);
        break;
      case "SPACESHIP_ROTATE":
        onSpaceShipRotate(state, action.spaceShip);
        break;
      case "CHANGE_TURN":
        onChangeTurn(state);
        break;
      case "START_GAME":
        onStartGame(state);
        break;
      case "SQUARE_CLICK":
        onSquareClick(state, action.position);
        break;
      case "RESET_GAME":
        onResetGame(state);
        break;
      case "AI_PLAY":
        onAIPlay(state);
        break;
      default:
        throw new Error();
    }
  }

  const onResetGame = (state: GameState) => {
    const newState = gameHelper.getGameInitialState(state.opponent);

    state.gameStarted = newState.gameStarted;
    state.gameWon = newState.gameWon;
    state.player1 = newState.player1;
    state.player2 = newState.player2;
    state.turn = newState.turn;
    state.turnFinished = newState.turnFinished;
  };

  const onChangeTurn = (state: GameState) => {
    state.turn = state.turn === "player1" ? "player2" : "player1";
    state.turnFinished = false;
    state.lastClickedSquare = null;
  };

  const onStartGame = (state: GameState) => {
    state.gameStarted = true;
  };

  const updateDestroyedShips = (state: GameState, spaceShipId: string) => {
    const { board } = state[state.turn == "player1" ? "player2" : "player1"];

    const squares: Square[] = [];
    board.forEach((row) =>
      row.forEach((square) => {
        if (square.occupied == spaceShipId) {
          squares.push(square);
        }
      })
    );

    if (squares.every((square) => square.clicked)) {
      squares.forEach((square) => (square.destroyed = true));
    }
  };

  const checkWin = (state: GameState) => {
    const { board } = state[state.turn == "player1" ? "player2" : "player1"];

    const squares: Square[] = [];
    board.forEach((row) =>
      row.forEach((square) => {
        if (square.occupied) {
          squares.push(square);
        }
      })
    );

    if (squares.every((square) => square.destroyed)) {
      state.gameWon = state.turn;
    }
  };

  const onSquareClick = (
    state: GameState,
    position: { x: number; y: number }
  ) => {    
    if(state.opponent == "computer" && state.turn == "player2") return ;

    squareClick(state, position);
  };

  const squareClick = (state: GameState, position: { x: number; y: number }) => {
    if (!state.gameStarted || state.turnFinished) return;

    const player = state.turn === "player1" ? "player2" : "player1";

    const { board } = state[player];

    const square = board[position.x][position.y];


    if (!square.clicked) {
      state.lastClickedSquare = `${position.x}-${position.y}`;
      square.clicked = true;

      if (square.occupied) {
        updateDestroyedShips(state, square.occupied);
        checkWin(state);
      } 
    }

    state.turnFinished = true;
  }

  const getSquareByCoordinates = (
    x: number,
    y: number
  ): { x: number; y: number } | null => {
    if (!x || !y) {
      return null;
    }

    const boardEl = document.getElementById("board");

    if (!boardEl || !boardEl.offsetWidth || !boardEl.offsetHeight) {
      return null;
    }

    const coordinates = { x: x - boardEl.offsetLeft, y: y - boardEl.offsetTop };

    if (
      coordinates.x < 0 ||
      coordinates.x >= 500 ||
      coordinates.y < 0 ||
      coordinates.y >= 500
    ) {
      return null;
    }

    return {
      x: Math.floor(coordinates.x / 50),
      y: Math.floor(coordinates.y / 50),
    };
  };

  const onSpaceShipStartMoving = (state: GameState, spaceShip: any) => {
    const { board, spaceShips } = state[state.turn];

    updateOccupiedSquares(board, spaceShips, spaceShip);
  };

  const detectColision = (
    board: Square[][],
    start: { x: number; y: number },
    end: { x: number; y: number },
    exception?: SpaceShip
  ) => {
    for (let x = start.x; x <= end.x; x++) {
      for (let y = start.y; y <= end.y; y++) {
        if (
          board[x][y].occupied &&
          (!exception || (exception && exception.id != board[x][y].occupied))
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const onSpaceShipDrop = (
    state: GameState,
    position: { x: number; y: number },
    spaceShip: SpaceShip
  ): any => {
    const { board, spaceShips } = state[state.turn];

    const squareCoordinates = getSquareByCoordinates(position.x, position.y);
    if (squareCoordinates) {
      const { x, y } = squareCoordinates;

      const { start, end } = getStartAndEndCoordinates(
        x,
        y,
        spaceShip.size,
        spaceShip.horizontal
      );

      if (!detectColision(board, start, end)) {
        const spaceShipToUpdate = spaceShips.find(
          (draftSpaceShip: any) => draftSpaceShip.id === spaceShip.id
        );
        if (spaceShipToUpdate) {
          spaceShipToUpdate.isOnBoard = true;
          spaceShipToUpdate.x = start.x;
          spaceShipToUpdate.y = start.y;
        }

        board.forEach((row) =>
          row.forEach((square) => {
            square.occupied = null;
            square.highlight = false;
          })
        );

        updateOccupiedSquares(board, spaceShips);
      } else {
        const spaceShipToUpdate = spaceShips.find(
          (draftSpaceShip: any) => draftSpaceShip.id === spaceShip.id
        );
        if (spaceShipToUpdate) {
          spaceShipToUpdate.isOnBoard = false;
          spaceShipToUpdate.x = null;
          spaceShipToUpdate.y = null;
        }

        board.forEach((row) =>
          row.forEach((square) => {
            square.occupied = null;
            square.highlight = false;
          })
        );

        updateOccupiedSquares(board, spaceShips);
      }
    } else {
      const spaceShipToUpdate = spaceShips.find(
        (draftSpaceShip: any) => draftSpaceShip.id === spaceShip.id
      );
      if (spaceShipToUpdate) {
        spaceShipToUpdate.isOnBoard = false;
        spaceShipToUpdate.x = null;
        spaceShipToUpdate.y = null;
      }

      updateOccupiedSquares(board, spaceShips);
    }
  };

  const updateOccupiedSquares = (
    board: Square[][],
    spaceShips: SpaceShip[],
    exception?: SpaceShip
  ) => {
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        if (board[i][j].occupied) {
          board[i][j].occupied = null;
        }
      }
    }

    spaceShips
      .filter(
        ({ isOnBoard, id }) =>
          isOnBoard && (exception ? id !== exception.id : true)
      )
      .forEach(({ id, horizontal, x, y, size }) => {
        if (x === null || y === null) return;

        if (horizontal) {
          for (let i = x; i < x + size; i++) {
            if (i < 10 && y < 10) {
              board[i][y].occupied = id;
            }
          }
        } else {
          for (let i = y; i < y + size; i++) {
            if (i < 10 && x < 10) {
              board[x][i].occupied = id;
            }
          }
        }
      });
  };

  const getStartAndEndCoordinates = (
    x: number,
    y: number,
    size: number,
    horizontal: boolean
  ) => {
    const start = { x, y };
    const end = { x, y };
    if (horizontal) {
      start.x = x >= 10 - size ? 10 - size : x;
      end.x = Math.min(9, x + size - 1);
    } else {
      start.y = y >= 10 - size ? 10 - size : y;
      end.y = Math.min(9, y + size - 1);
    }

    return { start, end };
  };

  const highlight = (
    board: Square[][],
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    for (let x = start.x; x <= end.x; x++) {
      for (let y = start.y; y <= end.y; y++) {
        board[x][y].highlight = true;
      }
    }
  };

  const resetHighlight = (board: Square[][]) => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board[i][j].highlight = false;
      }
    }
  };

  const onSpaceShipMove = (
    state: any,
    position: { x: number; y: number },
    spaceShip: SpaceShip
  ): any => {
    if (isNaN(position.x) || isNaN(position.y)) {
      return;
    }

    const squareCoordinate = getSquareByCoordinates(position.x, position.y);

    const { board } = state[state.turn];
    resetHighlight(board);

    if (squareCoordinate) {
      const { x, y } = squareCoordinate;

      const { start, end } = getStartAndEndCoordinates(
        x,
        y,
        spaceShip.size,
        spaceShip.horizontal
      );

      highlight(board, start, end);
    }
  };

  const onSpaceShipRotate = (
    state: GameState,
    spaceShipToRotate: SpaceShip
  ) => {
    const { board, spaceShips } = state[state.turn];

    if (
      spaceShipToRotate.isOnBoard &&
      typeof spaceShipToRotate.x == "number" &&
      typeof spaceShipToRotate.y == "number"
    ) {
      const { start, end } = getStartAndEndCoordinates(
        spaceShipToRotate.x,
        spaceShipToRotate.y,
        spaceShipToRotate.size,
        !spaceShipToRotate.horizontal
      );

      if (!detectColision(board, start, end, spaceShipToRotate)) {
        const spaceShipToUpdate = spaceShips.find(
          (spaceShip) => spaceShip.id === spaceShipToRotate.id
        );
        if (spaceShipToUpdate) {
          spaceShipToUpdate.horizontal = !spaceShipToUpdate.horizontal;
          spaceShipToUpdate.x = start.x;
          spaceShipToUpdate.y = start.y;
        }
      }

      updateOccupiedSquares(board, spaceShips);
    } else {
      const spaceShipToUpdate = spaceShips.find(
        (spaceShip) => spaceShip.id === spaceShipToRotate.id
      );
      if (spaceShipToUpdate) {
        spaceShipToUpdate.horizontal = !spaceShipToUpdate.horizontal;
      }
    }
  };

  const onAIPlay = (state: GameState) => {
    let position = {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10),
    };
    while (
      state[state.turn == "player1" ? "player2" : "player1"].board[position.x][
        position.y
      ].clicked
    ) {
      position = {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
      };
    }
    squareClick(state, position);
  };

  const [game, gameStateDispatcher] = useImmerReducer(
    gameStateReducer,
    gameHelper.getGameInitialState(opponent)
  );

  return (
    <GameStateContext.Provider value={game}>
      <GameDispatcherContext.Provider value={gameStateDispatcher}>
        {children}
      </GameDispatcherContext.Provider>
    </GameStateContext.Provider>
  );
};
