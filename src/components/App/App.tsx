import { BrowserRouter as Router, HashRouter, Route, Routes } from 'react-router-dom';
import Game from '../Game/Game';
import Home from '../Home/Home';
import styles from './App.module.scss';

function App() {
  const { container, title } = styles;
  
  return (
    <main className={container}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </HashRouter>
    </main>
  );
}

export default App;
