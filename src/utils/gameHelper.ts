import { spaceShip } from "../types/types";

import img1 from "../assets/images/spaceships/1.svg";
import img2 from "../assets/images/spaceships/2.svg";
import img3 from "../assets/images/spaceships/3.svg";
import img4 from "../assets/images/spaceships/4.svg";
import img5 from "../assets/images/spaceships/5.svg";
import { nanoid } from "nanoid";

const images = [img1, img2, img3, img4, img5];

export function getSpaceShip(size: number): spaceShip {
  if (!size || size < 1 || size > 5) {
    throw new Error("Incorrect size for spaceship");
  }

  return {
    id: nanoid(),
    size: size,
    src: images[size - 1],
    x: null,
    y: null,
    vertical: false,
    isOnBoard: false
  };
}

export const getBoardInitialState = () => {
  const arr: any[] = [];
  for (let i = 0; i < 10; i++) {
    const row: any[] = [];
    for (let j = 0; j < 10; j++) {
      row.push({ value: 1, highlight: false, id: nanoid() });
    }
    arr.push(row);
  }
  return arr;
};

export const getSpaceShipsInitialState = () => {
  const arr: spaceShip[] = [];
  const sizes = [2, 3, 3, 4, 5];
  for(const size of sizes){
    arr.push(getSpaceShip(size));
  }

  console.log("NOVO", arr);
  return arr;
};

export const getGameInitialState: any = () => {
  return {
    player1: {
      board: getBoardInitialState(),
      spaceShips: getSpaceShipsInitialState(),
    },
    player2: {
      board: getBoardInitialState(),
      spaceShips: getSpaceShipsInitialState(),
    },
    turn: 'player1',
    gameStarted: false
  };
};
