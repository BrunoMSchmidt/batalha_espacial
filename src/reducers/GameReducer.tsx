import {GameState, SpaceShip, Square} from "../types/types";

export function gameStateReducer(state: GameState, action: any) {
    switch (action.type) {
        case 'SPACESHIP_START_MOVING':
            onSpaceShipStartMoving(state, action.spaceShip);
            break;
        case 'SPACESHIP_MOVE':
            onSpaceShipMove(state, action.position, action.spaceShip);
            break;
        case 'SPACESHIP_DROP':
            onSpaceShipDrop(state, action.position, action.spaceShip);
            break;
        case 'SPACESHIP_ROTATE':
            onSpaceShipRotate(state, action.spaceShip);
            break;
        case 'CHANGE_TURN':
            onChangeTurn(state);
            break;
        case 'START_GAME':
            onStartGame(state);
            break;
        case "SQUARE_CLICK":
            onSquareClick(state, action.position);
            break;
        default:
            throw new Error();
    }
}

const onChangeTurn = (state: GameState) => {
    state.turn = state.turn === 'player1' ? 'player2' : 'player1';
    state.turnFinished = false;
};

const onStartGame = (state: GameState) => {
    state.gameStarted = true;
}

const updateDestroyedShips = (state: GameState, spaceShipId: string) => {
    const { spaceShips, board } = state[state.turn == "player1" ? "player2" : "player1"];

    const squares: Square[] = [];
    board.forEach(row => row.forEach(square => {
        if(square.occupied == spaceShipId){
            squares.push(square);
        }
    }));

    if(squares.every(square => square.clicked)){
        squares.forEach(square => square.destroyed = true);
    }
}

const checkWin = (state: GameState) => {
    const { board } = state[state.turn == "player1" ? "player2" : "player1"];

    const squares: Square[] = [];
    board.forEach(row => row.forEach(square => {
        if(square.occupied){
            squares.push(square);
        }
    }));

    if(squares.every(square => square.destroyed)){
        alert(`${state.turn} venceu!`);
    }
}

const onSquareClick = (state: GameState, position: { x: number, y: number }) => {
    if(state.turnFinished) return;

    const player = state.turn === 'player1' ? 'player2': 'player1';

    const { board } = state[player];

    const square = board[position.x][position.y];

    if(!square.clicked){
        square.clicked = true;

        if(square.occupied){
            updateDestroyedShips(state, square.occupied);
            checkWin(state);
        } else {
            state.turnFinished = true;
        }
    }
}

const getSquareByCoordinates = (x: number, y: number,): { x: number; y: number } | null => {
    if (!x || !y) {
        return null;
    }
    const elementBelow = document
        .elementsFromPoint(x, y)
        .find((element) => element.classList.contains('droppable'));

    if (elementBelow) {
        const parent = elementBelow.parentElement;

        if(!parent || !parent.parentNode) return null;

        const y = Array.from(parent.children).indexOf(elementBelow);
        const x = Array.from(parent.parentNode.children).indexOf(parent);

        if(x < 0 || y < 0) return null;

        return {x, y};
    }
    return null;
};

const onSpaceShipStartMoving = (state: GameState, spaceShip: any) => {
    const { board, spaceShips } = state[state.turn];

    updateOccupiedSquares(board, spaceShips, spaceShip);
};

const onSpaceShipDrop = (state: GameState, position: { x: number; y: number }, spaceShip: SpaceShip,): any => {
    const {board, spaceShips} = state[state.turn];

    const squareCoordinates = getSquareByCoordinates(position.x, position.y);
    if (squareCoordinates) {
        const {x, y} = squareCoordinates;

        const {start, end} = getStartAndEndCoordinates(x, y, spaceShip.size, spaceShip.horizontal);

        let canDrop = true;
        for (let x = start.x; x <= end.x && canDrop; x++) {
            for (let y = start.y; y <= end.y && canDrop; y++) {
                if (board[x][y].occupied) {
                    canDrop = false;
                }
            }
        }

        if (canDrop) {
            const spaceShipToUpdate = spaceShips.find((draftSpaceShip: any) => draftSpaceShip.id === spaceShip.id);
            if(spaceShipToUpdate){
                spaceShipToUpdate.isOnBoard = true;
                spaceShipToUpdate.x = start.x;
                spaceShipToUpdate.y = start.y;
            }

            board.forEach(row => row.forEach(square => {
                square.occupied = null;
                square.highlight = false;
            }));

            updateOccupiedSquares(board, spaceShips);
        } else {
            const spaceShipToUpdate = spaceShips.find((draftSpaceShip: any) => draftSpaceShip.id === spaceShip.id);
            if(spaceShipToUpdate){
                spaceShipToUpdate.isOnBoard = false;
                spaceShipToUpdate.x = null;
                spaceShipToUpdate.y = null;
            }

            board.forEach(row => row.forEach(square => {
                square.occupied = null;
                square.highlight = false;
            }));


            updateOccupiedSquares(board, spaceShips);
        }
    } else {
        const spaceShipToUpdate = spaceShips.find((draftSpaceShip: any) => draftSpaceShip.id === spaceShip.id);
        if(spaceShipToUpdate){
            spaceShipToUpdate.isOnBoard = false;
            spaceShipToUpdate.x = null;
            spaceShipToUpdate.y = null;
        }

        updateOccupiedSquares(board, spaceShips);
    }
};

const updateOccupiedSquares = (board: Square[][], spaceShips: SpaceShip[], exception?: SpaceShip) => {
    for (let i = 0; i <= 9; i++) {
        for (let j = 0; j <= 9; j++) {
            if (board[i][j].occupied) {
                board[i][j] = {...board[i][j], occupied: null};
            }
        }
    }

    spaceShips
        .filter(({isOnBoard, id}) => isOnBoard && (exception ? id !== exception.id : true))
        .forEach(({ id, horizontal, x, y, size }) => {
        if (x === null || y === null) return;

        if (horizontal) {
            for (let i = x; i < x + size; i++) {
                if (i < 10 && y < 10) {
                    board[i][y] = {...board[y][i], occupied: id};
                }
            }
        } else {
            for (let i = y; i < y + size; i++) {
                if (i < 10 && x < 10) {
                    board[x][i] = {...board[i][x], occupied: id};
                }
            }
        }
    });
};

const getStartAndEndCoordinates = (x: number, y: number, size: number, horizontal: boolean) => {
    const start = {x, y};
    const end = {x, y};
    if (horizontal) {
        start.x = x >= (10 - size) ? (10 - size) : x;
        end.x = Math.min(9, x + size - 1);
    } else {
        start.y = y >= (10 - size) ? (10 - size) : y;
        end.y = Math.min(9, y + size - 1);
    }

    return {start, end};
};

const onSpaceShipMove = (state: any, position: { x: number; y: number }, spaceShip: SpaceShip,): any => {

    if (isNaN(position.x) || isNaN(position.y)) {
        return;
    }

    const squareCoordinate = getSquareByCoordinates(position.x, position.y);

    const { board } = state[state.turn];

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            board[i][j].highlight = false;
        }
    }

    if (squareCoordinate) {
        const {x, y} = squareCoordinate;

        const {start, end} = getStartAndEndCoordinates(x, y, spaceShip.size, spaceShip.horizontal);

        for (let x = start.x; x <= end.x; x++) {
            for (let y = start.y; y <= end.y; y++) {
                board[x][y].highlight = true;
            }
        }
    }
};

const onSpaceShipRotate = (state: GameState, spaceShipToRotate: SpaceShip) => {
    const { board, spaceShips } = state[state.turn];

    if (spaceShipToRotate.isOnBoard && spaceShipToRotate.x && spaceShipToRotate.y) {
        const {start, end} = getStartAndEndCoordinates(spaceShipToRotate.x, spaceShipToRotate.y, spaceShipToRotate.size, !spaceShipToRotate.horizontal);

        let canDrop = true;
        for (let x = start.x; x <= end.x; x++) {
            for (let y = start.y; y <= end.y; y++) {
                if (board[x][y].occupied && board[x][y].occupied !== spaceShipToRotate.id) {
                    canDrop = false;
                }
            }
        }

        if (canDrop) {
            const spaceShipToUpdate = spaceShips.find(spaceShip => spaceShip.id === spaceShipToRotate.id);
            if(spaceShipToUpdate){
                spaceShipToUpdate.horizontal = !spaceShipToUpdate.horizontal;
                spaceShipToUpdate.x = start.x;
                spaceShipToUpdate.y = start.y;
            }
        }

        updateOccupiedSquares(board,spaceShips);
    } else {
        const spaceShipToUpdate = spaceShips.find(spaceShip => spaceShip.id === spaceShipToRotate.id);
        if(spaceShipToUpdate){
            spaceShipToUpdate.horizontal = !spaceShipToUpdate.horizontal;
        }
    }
};