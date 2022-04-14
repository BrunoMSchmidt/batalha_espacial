import { spaceShip } from "../types/types";

import img1 from "../assets/images/spaceships/1.svg";
import img2 from "../assets/images/spaceships/2.svg";
import img3 from "../assets/images/spaceships/3.svg";
import img4 from "../assets/images/spaceships/4.svg";
import img5 from "../assets/images/spaceships/5.svg";
import { nanoid } from "nanoid";

const spaceShips: spaceShip[] = [
  {
    id: nanoid(),
    size: 1,
    src: img1,
    x: null,
    y: null,
    vertical: false,
    isOnBoard: false,
  },
  {
    id: nanoid(),
    size: 2,
    src: img2,
    x: null,
    y: null,
    vertical: false,
    isOnBoard: false,
  },
  {
    id: nanoid(),
    size: 3,
    src: img3,
    x: null,
    y: null,
    vertical: false,
    isOnBoard: false,
  },
  {
    id: nanoid(),
    size: 4,
    src: img4,
    x: null,
    y: null,
    vertical: false,
    isOnBoard: false,
  },
  {
    id: nanoid(),
    size: 5,
    src: img5,
    x: null,
    y: null,
    vertical: false,
    isOnBoard: false,
  },
];

export function getSpaceShip(size: number): spaceShip {
  if (!size || size < 1 || size > 5) {
    throw new Error("Incorrect size for spaceship");
  }

  return spaceShips[size - 1];
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
  for (let i = 1; i <= 5; i++) {
    arr.push(getSpaceShip(i));
  }
  return arr;
};

export const getGameInitialState: any = () => {
  return {
    board: getBoardInitialState(),
    spaceShips: getSpaceShipsInitialState(),
  };
};
