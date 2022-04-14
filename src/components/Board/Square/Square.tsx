import { memo } from 'react';
import styles from './Square.module.scss';

type SquareProps = {
  x: number,
  y: number,
  value: number,
  highlight: boolean,
  occupied: boolean
}

const Square = memo(function Square({x, y, value, highlight, occupied}: SquareProps){
  // console.log(`Square [${x},${y}] rendered. ${highlight}`)

  const style = {
    backgroundColor: highlight ? occupied ? 'red' : 'green' : 'transparent'
  }

  return (
    <div className={`droppable ${styles.square}`} style={style}>
      {/* {occupied ? "OCUPADO" : "NAO"} */}
    </div>
  )
})

export default Square;