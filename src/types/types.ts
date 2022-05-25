export type SpaceShip = {
  id: string,
  size: number,
  src: string,
  x: number | null,
  y: number | null,
  horizontal: boolean,
  isOnBoard: boolean
}

export type Square = {
  highlight: boolean,
  occupied: string | null,
  clicked: boolean,
  destroyed: boolean
}

export type GameState = {
  player1: {
    board: Square[][],
    spaceShips: SpaceShip[],
  },
  player2: {
    board: Square[][],
    spaceShips: SpaceShip[]
  },
  turn: 'player1' | 'player2',
  gameStarted: boolean,
  gameFinished: boolean,
  turnFinished: boolean
}
