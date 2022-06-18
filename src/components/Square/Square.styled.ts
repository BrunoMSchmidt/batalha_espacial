import { styled } from "@mui/material/styles";
import {css, keyframes} from "@emotion/react";

const fire = (color: string) => keyframes`
  80% {
    transform: scale(1.2);
    border-radius: 5px;
    border: none;
    background-color: ${color};
    box-shadow: 0px 0px 20px 3px yellow, 0px 0px 40px 6px red, 0px 0px 80px 10px orange;
  }
`

export const StyledSquare = styled("div", { shouldForwardProp(propName) {
  return !!["onClick", "onMouseEnter"].includes(propName as string);
},})<{ highlight: boolean, occupied: string | null, gamestarted: boolean, clicked: boolean, destroyed: boolean, animate: boolean, squareSize: number }>(props => css`
    width: ${props.squareSize}px;
    height: ${props.squareSize}px;
    background-color: ${props.highlight ? props.occupied ? 'red' : 'green' : 'transparent'};
    border: 1px solid #666;
    color: #999;
    display: grid;
    place-items: center;
    
    ${props.gamestarted ? css`
      background-color: ${props.destroyed ? props.theme.palette.primary.main + "33" : props.clicked ? props.occupied ? "lightgreen" : '#444' : ''};
      cursor:pointer;
      ${!props.clicked ? css`
          &:hover {
            background-color: #444;
          }
        ` : ``}
      ` : ``}
      ${props.animate ? css`
      animation: ${fire(props.theme.palette.primary.main)} 215ms ease-out ;` : ``
    }
`)

