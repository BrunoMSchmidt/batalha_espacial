import { useNavigate, useParams } from "react-router-dom";
import * as gameHelper from "../../utils/gameHelper";
import SpaceShips from "../SpaceShips/SpaceShips";
import Board from "../Board/Board";
import {
  GameStateContext,
  GameDispatcherContext,
} from "../../contexts/GameContext";
import {
  StyledBackWrapper,
  StyledBoardWrapper,
  StyledContainer,
  StyledOption,
  StyledTitle,
} from "./Game.styled";
import { useContext, useEffect } from "react";
import { SoundContext } from "../../contexts/SoundContext";
import Modal from "@mui/material/Modal";
import GameResult from "../GameResult/GameResult";
import { Fade, Tooltip } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

function Game() {
  const navigate = useNavigate();

  const game = useContext(GameStateContext);
  const gameStateDispatcher = useContext(GameDispatcherContext);

  const canClickOnOption = game.gameStarted
    ? game.turnFinished
    : game[game.turn].spaceShips.every((spaceShip: any) => spaceShip.isOnBoard);

  const { playAudio, stopAudio } = useContext(SoundContext);

  useEffect(() => {
    stopAudio("preGameSoundtrack");

    return () => {
      playAudio("preGameSoundtrack");
    };
  }, []);

  useEffect(() => {
    if(game && game.gameStarted && game.opponent == "computer" && game.turn == "player2" && !game.gameWon && game.turnFinished == false){
      setTimeout(() => {
        handleAiPlay();
      }, 500);
    }
  })

  const handleAiPlay = () => {
    gameStateDispatcher({ type: "AI_PLAY"});
  }

  const onOptionClick = () => {
    gameStateDispatcher({ type: "CHANGE_TURN" });
    if (game.turn == "player2" && !game.gameStarted) {
      gameStateDispatcher({ type: "START_GAME" });
    }
  };

  const getOptionText = () => {
    return !game.gameStarted
      ? game.turn == "player2"
        ? "Start"
        : "READY"
      : "NEXT";
  };

  const getTitleText = () => {
    return `Vez do ${game.turn === "player1" ? "Jogador 1" : `${game.opponent == "computer" ? "Computador" : "Jogador 2"}`}`;
  };

  const navigateBack = () => {
    navigate('../');
  }

  return (
    <>
      <Modal 
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={!!game.gameWon}
        closeAfterTransition                
      >
        <>
          <GameResult player={game.turn}></GameResult>
        </>
      </Modal>
      <Fade in={true}>
        <StyledContainer>
          <Tooltip title="Voltar">
            <StyledBackWrapper
              onClick={navigateBack}
            >
              <ArrowBack htmlColor="orange" fontSize="large"></ArrowBack>
            </StyledBackWrapper>
          </Tooltip>
          <StyledTitle>{getTitleText()}</StyledTitle>
          <StyledBoardWrapper>
            <Board game={game}/>
            {!game.gameStarted && <SpaceShips game={game} />}
          </StyledBoardWrapper>
          <StyledOption disabled={!canClickOnOption} onClick={onOptionClick}>
            {getOptionText()}
          </StyledOption>
        </StyledContainer>
      </Fade>
    </>
  );
}

export default Game;
