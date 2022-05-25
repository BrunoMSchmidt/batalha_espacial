import React, {memo, useContext} from 'react';
import {Square as SquareType} from '../../types/types';
import { StyledSquare } from "./Square.styled";
import GameContext from "../../contexts/GameContext";

type SquareProps = SquareType & {
    x: number,
    y: number,
    gameStarted: boolean
};

const Square = memo(({
                         x, y, highlight, occupied, gameStarted, clicked, destroyed
                     }: SquareProps) => {

    const [game, gameDispatcher] = useContext(GameContext);

    const onSquareClick = () => {
        gameDispatcher({type: 'SQUARE_CLICK', position: { x, y }})
    }

    return (
        <StyledSquare
            highlight={highlight}
            occupied={occupied}
            gameStarted={gameStarted}
            clicked={clicked}
            destroyed={destroyed}
            className={`droppable`}
            onClick={onSquareClick}
        > </StyledSquare>
    );
});

export default Square;
