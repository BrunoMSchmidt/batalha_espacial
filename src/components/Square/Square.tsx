import React, {memo, useContext, useEffect, useState} from 'react';
import {Square as SquareType} from '../../types/types';
import {StyledSquare} from "./Square.styled";
import { GameDispatcherContext } from "../../contexts/GameContext";

type SquareProps = SquareType & {
    x: number,
    y: number,
    gameStarted: boolean,
    turnFinished: boolean,
    animate: boolean
};

const Square = memo(({
                         x, y, highlight, occupied, gameStarted, clicked, destroyed, turnFinished, animate
                     }: SquareProps) => {

    const gameDispatcher = useContext(GameDispatcherContext);

    const onSquareClick = () => {
        gameDispatcher({type: 'SQUARE_CLICK', position: {x, y}})
    }

    return (
        <StyledSquare
            highlight={highlight}
            occupied={occupied}
            gamestarted={gameStarted}
            clicked={clicked}
            destroyed={destroyed}
            className={`droppable`}
            onClick={onSquareClick}
            animate={animate}
        ></StyledSquare>
    );
});

export default Square;
