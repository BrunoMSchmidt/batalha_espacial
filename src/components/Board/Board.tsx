import {useContext} from 'react';
import { GameState } from '../../types/types';
import SpaceShip from '../SpaceShip/SpaceShip';
import Square from '../Square/Square';
import {StyledBoard, StyledRow} from "./Board.styled";

function Board(props: {game: GameState}) {
    const {game} = props;

    let turn = game.turn;
    if (game.gameStarted) {
        turn = game.turn === 'player1' ? 'player2' : 'player1';
    }

    const board = game[turn].board;
    const spaceShips = game[turn].spaceShips;

    const spaceShipsElement = (
        <div className="spaceships">
            {spaceShips
                .filter(spaceShip => spaceShip.isOnBoard)
                .map((spaceShip: any, index: number) => (
                    <SpaceShip
                        key={spaceShip.id}
                        spaceShip={spaceShip}
                        gameStarted={game.gameStarted}
                        index={index}
                    />
                ))
            }
        </div>
    )

    const boardId = game.gameStarted ? `board-${turn}` : `board`;
    
    return (
        <StyledBoard id={boardId}>
            {board.map((row, i) => (
                <StyledRow key={i}>
                    {row.map((square, j) => (
                        <Square
                            x={i}
                            y={j}
                            key={`${i}_${j}`}
                            highlight={square.highlight}
                            occupied={square.occupied}
                            gameStarted={game.gameStarted}
                            clicked={square.clicked}
                            destroyed={square.destroyed}
                            turnFinished={game.turnFinished}
                            animate={game.lastClickedSquare == `${i}-${j}`}
                        />))}
                </StyledRow>
            ))}
            {!game.gameStarted && spaceShipsElement}
        </StyledBoard>
    );
}

export default Board;
