import { memo } from 'react';
import { SquareType } from '../../../types/types';
import styles from './Square.module.scss';

type SquareProps = SquareType & {};

const Square = memo(function Square({x, y, value, highlight, occupied}: SquareProps){
  const style = {
    backgroundColor: highlight ? occupied ? 'red' : 'green' : 'transparent',
    overflow: 'hidden'
  }

  return (
    <div className={`droppable ${styles.square}`} style={style}>
      {/* {occupied} */}
    </div>
  )
})

export default Square;