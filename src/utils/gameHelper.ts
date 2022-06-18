import { nanoid } from 'nanoid';
import {GameState, SpaceShip, Square} from '../types/types';

import img1 from '../assets/images/spaceships/1.svg';
import img2 from '../assets/images/spaceships/2.svg';
import img3 from '../assets/images/spaceships/3.svg';
import img4 from '../assets/images/spaceships/4.svg';
import img5 from '../assets/images/spaceships/5.svg';

const images = [img1, img2, img3, img4, img5];

export function getSpaceShip(size: number): SpaceShip {
  if (!size || size < 1 || size > 5) {
    throw new Error('Incorrect size for spaceship');
  }

  return {
    id: nanoid(),
    size,
    src: images[size - 1],
    x: null,
    y: null,
    horizontal: false,
    isOnBoard: false,
    destroyed: false
  };
}

export const getBoardInitialState = () => {
  const arr: Square[][] = [];
  for (let i = 0; i < 10; i++) {
    const row: Square[] = [];
    for (let j = 0; j < 10; j++) {
      row.push({ highlight: false, occupied: null, clicked: false, destroyed: false });
    }
    arr.push(row);
  }
  return arr;
};

export function getSpaceShipsInitialState(): SpaceShip[] {
  const arr: SpaceShip[] = [];
  const sizes = [2, 3, 3, 4, 5]; // [2, 3, 3, 4, 5]
  sizes.forEach((size) => {
    arr.push(getSpaceShip(size));
  });

  return arr;
}

export function getGameInitialState(opponent: "player" | "computer"): GameState {
  return {
    player1: {
      board: getBoardInitialState(),
      spaceShips: getSpaceShipsInitialState(),
    },
    player2: {
      board: getBoardInitialState(),
      spaceShips: getSpaceShipsInitialState(),
    },
    lastClickedSquare: null,
    turn: 'player1',
    gameStarted: false,
    gameWon: null,
    turnFinished: false,
    opponent: opponent,
    squareSize: Math.min(window.innerWidth / 12, (window.innerHeight - 88) / 12)
  }
};
