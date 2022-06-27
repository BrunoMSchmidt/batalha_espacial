import { Slide } from "@mui/material";
import { useContext } from "react";
import ReactConfetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { GameDispatcherContext } from "../../contexts/GameContext";
import { StyledButtonsContainer, StyledContainer, StyledContent, StyledText, StyledButton } from "./GameResult.styled";

type GameResultProps = {
  player: "player1" | "player2",
  opponent: "player" | "computer"
}

function GameResult(props: GameResultProps) {
  const navigate = useNavigate();
  const gameStateDispatcher = useContext(GameDispatcherContext);

  function playAgain(){
    gameStateDispatcher({ type: "RESET_GAME" });
  }

  function goToMenu(){
    navigate('/');
  }


  return (
    <Slide in={true} timeout={500}>
      <StyledContainer>
        <ReactConfetti
          style={{ width: "100%", height: "100%" }}
          numberOfPieces={200}
        ></ReactConfetti>
        <StyledContent>
          <StyledText>{`${props.player === "player1" ? "Jogador 1" : props.opponent == "computer" ? "Computador" : "Jogador 2"} venceu!`}</StyledText>
          <StyledButtonsContainer>
            <StyledButton variant="outlined" onClick={playAgain}>Jogar Novamente</StyledButton>
            <StyledButton variant="outlined" onClick={goToMenu}>Sair</StyledButton>
          </StyledButtonsContainer>
        </StyledContent>
      </StyledContainer>
    </Slide>
  )
}

export default GameResult;