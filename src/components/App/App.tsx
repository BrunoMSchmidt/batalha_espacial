import { HashRouter, Route, Routes } from "react-router-dom";
import { ConfigurationContextProvider } from "../../contexts/ConfigurationContext";
import Game from "../Game/Game";
import Home from "../Home/Home";
import { StyledContainer } from "./App.styled";
import { SoundContextProvider } from "../../contexts/SoundContext";
import { Configuration } from "../Configuration/Configuration";
import { createTheme, ThemeProvider } from "@mui/material";
import { GameContextProvider } from "../../contexts/GameContext";
import { Statistics } from "../Statistics/Statistics";
import { StatisticsContextProvider } from "../../contexts/StatisticsContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffba49",
      light: "#ffba49",
    },
    secondary: {
      main: "#4AA9FF",
      light: "#4AA9FF",
    },
  },
  typography: {
    fontFamily: "'Playfair Display', sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <StyledContainer>
          <ConfigurationContextProvider>
            <SoundContextProvider>
              <StatisticsContextProvider>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/game/:opponent"
                    element={
                      <GameContextProvider>
                        <Game />
                      </GameContextProvider>
                    }
                  />
                  <Route path="/config" element={<Configuration />} />
                  <Route path="/statistics" element={<Statistics />} />
                </Routes>
              </StatisticsContextProvider>
            </SoundContextProvider>
          </ConfigurationContextProvider>
        </StyledContainer>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
