import {
  HashRouter, Route, Routes, useLocation,
} from 'react-router-dom';
import { ConfigurationContextProvider } from '../../contexts/ConfigurationContext';
import Game from '../Game/Game';
import Home from '../Home/Home';
import { StyledContainer } from "./App.styled";
import {SoundContextProvider} from "../../contexts/SoundContext";
import { Configuration } from '../Configuration/Configuration';

function App() {
  console.log('RENDER - App.');

  return (
    <StyledContainer>
      <ConfigurationContextProvider>
        <SoundContextProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game" element={<Game />} />
              <Route path="/config" element={<Configuration />} />
            </Routes>
          </HashRouter>
        </SoundContextProvider>
      </ConfigurationContextProvider>
    </StyledContainer>
  );
}

export default App;
