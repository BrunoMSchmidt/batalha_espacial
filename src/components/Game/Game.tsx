import {Link} from 'react-router-dom';
import * as gameHelper from '../../utils/gameHelper';
import SpaceShips from '../SpaceShips/SpaceShips';
import Board from '../Board/Board';
import GameContext from '../../contexts/GameContext';
import {useImmerReducer} from 'use-immer';
import { gameStateReducer } from '../../reducers/GameReducer'
import { StyledOption, StyledContainer, StyledBoardWrapper, StyledTitle} from "./Game.styled";
import {useContext, useEffect} from "react";
import {SoundContext} from "../../contexts/SoundContext";

function Game() {
    const [game, gameStateDispatcher] = useImmerReducer(gameStateReducer, gameHelper.getGameInitialState());

    const canClickOnOption = game.gameStarted ? game.turnFinished : game[game.turn].spaceShips.every((spaceShip: any) => spaceShip.isOnBoard);

    const {playAudio, stopAudio} = useContext(SoundContext);

    useEffect(() => {
        stopAudio('preGameSoundtrack')

        return () => {
            playAudio('preGameSoundtrack')
        }
    }, []);

    const onOptionClick = () => {
        gameStateDispatcher({type: 'CHANGE_TURN'} );
        if(game.turn == "player2" && !game.gameStarted) {
            gameStateDispatcher({type: 'START_GAME'});
        }
    }

    const getOptionText = () => {
        return (
            !game.gameStarted
                ? game.turn == "player2"
                    ? "Start"
                    : "READY"
                : "NEXT"
        )
    }

    const getTitleText = () => {
        return `${game.turn === 'player1' ? 'Player 1' : 'Player 2'}${game.gameStarted ? ' turn' : ''}`;
    }

    return (
        <GameContext.Provider value={[game, gameStateDispatcher]}>
            <StyledContainer>
                <StyledTitle>{getTitleText()}</StyledTitle>
                <StyledBoardWrapper>
                    <Board/>
                    {!game.gameStarted && <SpaceShips/>}
                </StyledBoardWrapper>
                <StyledOption disabled={!canClickOnOption}
                    onClick={onOptionClick}>
                    {
                       getOptionText()
                    }
                </StyledOption>
                <Link to="../">Back</Link>
            </StyledContainer>
        </GameContext.Provider>
    );
}

export default Game;
