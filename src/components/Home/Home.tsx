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
      <h1 className={styles.title}>BATALHA ASTRAL</h1>
      <div className={styles.options}>
        <Link to={"/game"} className={styles.option}>
          Jogar
        </Link>
        <div className={styles.option} onClick={quitApp}>
          Sair
        </div>
      </div>
    </div>
  );
}

export default Home;
