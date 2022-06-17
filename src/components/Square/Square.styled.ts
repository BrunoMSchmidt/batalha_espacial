import { styled } from "@mui/material/styles";
import {css, keyframes} from "@emotion/react";

const fire = (color: string) => keyframes`
  100% {
    transform: scale(1.2);
    border-radius: 5px;
    background-color: ${color};
    box-shadow: 0px 0px 20px 3px red;
  }
`

export const StyledSquare = styled("div", { shouldForwardProp(propName) {
  return propName === "onClick";
},})<{ highlight: boolean, occupied: string | null, gamestarted: boolean, clicked: boolean, destroyed: boolean, animate: boolean }>(props => css`
    width: 50px;
    height: 50px;
    background-color: ${props.highlight ? props.occupied ? 'red' : 'green' : 'transparent'};
    border: 1px solid #999;
    color: #999;
    display: grid;
    place-items: center;
    
    ${props.gamestarted ? css`
      background-color: ${props.destroyed ? props.theme.palette.primary.main : props.clicked ? props.occupied ? "lightblue" : '#555' : ''};
      cursor:pointer;
      ${!props.clicked ? css`
          &:hover {
            background-color: #444;
          }
        ` : ``}
      ` : ``}
      ${props.animate ? css`
      animation: ${fire(props.theme.palette.primary.main)} 200ms ;` : ``
    }
`)

