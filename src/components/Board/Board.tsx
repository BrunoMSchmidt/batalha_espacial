import {useContext} from 'react';
import GameContext from '../../contexts/GameContext';
import SpaceShip from '../SpaceShip/SpaceShip';
import Square from '../Square/Square';
import {StyledBoard, StyledRow} from "./Board.styled";

function Board() {
    const [game,] = useContext(GameContext);

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
                        index={index}
                    />
                ))
            }
        </div>
    )

    return (
        <StyledBoard>
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
                        />))}
                </StyledRow>
            ))}
            {!game.gameStarted && spaceShipsElement}
        </StyledBoard>
    );
}

export default Board;
