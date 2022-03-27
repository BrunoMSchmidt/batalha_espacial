import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

function Home() {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>
            BATALHA ASTRAL
        </h1>
        <div className={styles.options}>
            <Link to={'/game'} className={styles.option}>Jogar</Link>
            <div className={styles.option}>Sair</div>
        </div>
    </div>
);
}

export default Home;
