import SpaceShip from "../SpaceShips/SpaceShip/SpaceShip";
import styles from "./Board.module.scss";
import Square from "./Square/Square";

const Board = ({ board, spaceShips, gameStateDispatcher }: any) => {
  console.log('RENDER - Board', board);

  return (
    <div id="board" className={`${styles.board}`}>
      {board.map((row: any[], i: number) => (
        <div className={styles.row} key={i}>
          {row.map((square, j) => (
            <Square x={i} y={j} key={`${i}_${j}`} value={square.value} highlight={square.highlight} occupied={square.occupied}/>
          ))}
        </div>
      ))}
      <div className="spaceships"> 
        {spaceShips.filter((spaceShip: any) => spaceShip.isOnBoard).map((spaceShip: any, index: number) => (
          <SpaceShip key={spaceShip.id} gameStateDispatcher={gameStateDispatcher} spaceShip={spaceShip} index={index}/>
        ))}
      </div>
    </div>
  );
}

export default Board;
