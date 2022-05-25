import {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import {SoundContext} from "../../contexts/SoundContext";

function Home() {
  console.log('RENDER - Home.');

  const { playAudio, stopAudio } = useContext(SoundContext);

  function quitApp() {
    const win = window as any;
    const { api } = win;

    api.send('toMain', { funcao: 'sair' });
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>BATALHA ESPACIAL</h1>
      <div className={styles.options}>
        <Link to="/game" className={styles.option} onMouseEnter={() => playAudio('hover')} onClick={() => playAudio('select')}>
          Jogar
        </Link>
        <Link to="/config" className={styles.option} onMouseEnter={() => playAudio('hover')} onClick={() => playAudio('select')}>
          Configurações
        </Link>
        <Link to="." className={styles.option} onMouseEnter={() => playAudio('hover')} onClick={() => {quitApp(); playAudio('select')}}>
          Sair
        </Link>
      </div>
    </div>
  );
}

export default Home;
