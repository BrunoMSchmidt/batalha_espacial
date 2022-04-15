export type spaceShip = {
  id: string,
  size: number,
  src: string,
  x: number | null,
  y: number | null,
  vertical: boolean,
  isOnBoard: boolean
}

export type SquareType = {
  x: number,
  y: number,
  value: number,
  highlight: boolean,
  occupied: boolean
}