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
  lastClickedSquare: string | null,
  turn: 'player1' | 'player2',
  gameStarted: boolean,
  gameWon: 'player1' | 'player2' | null,
  turnFinished: boolean,
  opponent: "player" | "computer"
}

export type Sound = {
  name: "preGameSoundtrack" | "hover" | "select",
  type: "music" | "effect",
  autoplay?: boolean,
  loop?: boolean
  sound: any
}

export type Configuration = {
  volumeEffects: number,
  volumeMusic: number
}

export type Statistics = {
  gamesPlayed: number,
  wins: {
    player1: number,
    player2: number,
    computer: number
  },
  losses: {
    player1: number,
    player2: number,
    computer: number
  },
  spaceshipsDestroyed: {
    player1: number,
    player2: number,
    computer: number
  },
  shotsMissed: {
    player1: number,
    player2: number,
    computer: number
  },
  shotsHit: {
    player1: number,
    player2: number,
    computer: number
  }
}