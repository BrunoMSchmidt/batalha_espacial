import {createContext, Dispatch} from 'react'
import {GameState} from "../types/types";

// @ts-ignore
const GameContext = createContext<[GameState, Dispatch<any>]>(null);

export default GameContext