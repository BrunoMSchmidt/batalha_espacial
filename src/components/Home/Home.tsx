import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

function Home() {
  console.log("RENDER - Home.");

  function quitApp(){
    let win = window as any;
    let api = win.api

    api.send("toMain", { funcao: "sair" });
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>BATALHA ESPACIAL</h1>
      <div className={styles.options}>
        <Link to={"/game"} className={styles.option}>
          Jogar
        </Link>
        <Link to={"/config"} className={styles.option}>
          Configurações
        </Link>
        <Link to={'.'} onClick={quitApp} className={styles.option}>
          Sair
        </Link>
      </div>
    </div>
  );
}

export default Home;
