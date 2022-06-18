import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SoundContext } from "../../contexts/SoundContext";
import {
  StyledContainer,
  StyledOption,
  StyledOptions,
  StyledTitle,
} from "./Home.styled";
import { Zoom } from "@mui/material";
import { StatisticsContext } from "../../contexts/StatisticsContext";

function Home() {
  console.log("RENDER - Home.");

  const { playAudio } = useContext(SoundContext);
  const navigate = useNavigate();
  const [showPlayOptions, setShowPlayOptions] = useState(false);
  const { increment } = useContext(StatisticsContext);

  function quitApp() {
    const win = window as any;
    const { api } = win;

    api.send("toMain", { function: "quit" });
  }

  function onOptionClick(path: string = ".") {
    if(path == "/game/player" || path == "/game/computer") {
      playAudio('startGame');
    } else {
      playAudio("select");
    }
    navigateTo(path);
  }

  function navigateTo(path: string, options = {}) {
    navigate(path, options);
  }

  return (
    <Zoom in={true}>
      <StyledContainer>
        <StyledTitle>BATALHA ESPACIAL</StyledTitle>

        <StyledOptions>
          {showPlayOptions ? (
            <>
              <StyledOption
                onMouseEnter={() => playAudio("hover")}
                onClick={() => onOptionClick("/game/computer")}
              >
                Computador
              </StyledOption>
              <StyledOption
                onMouseEnter={() => playAudio("hover")}
                onClick={() => onOptionClick("/game/player")}
              >
                2 Jogadores
              </StyledOption>
              <StyledOption
                onMouseEnter={() => playAudio("hover")}
                onClick={() => setShowPlayOptions(false)}
              >
                Voltar
              </StyledOption>
            </>
          ) : (
            <>
              <StyledOption
                onMouseEnter={() => playAudio("hover")}
                onClick={() => setShowPlayOptions(true)}
              >
                Jogar
              </StyledOption>
              <StyledOption
                onMouseEnter={() => playAudio("hover")}
                onClick={() => onOptionClick("/statistics")}
              >
                Estatísticas
              </StyledOption>
              <StyledOption
                onMouseEnter={() => playAudio("hover")}
                onClick={() => onOptionClick("/config")}
              >
                Configurações
              </StyledOption>
              <StyledOption
                onMouseEnter={() => playAudio("hover")}
                onClick={quitApp}
              >
                Sair
              </StyledOption>
            </>
          )}
        </StyledOptions>
      </StyledContainer>
    </Zoom>
  );
}

export default Home;
