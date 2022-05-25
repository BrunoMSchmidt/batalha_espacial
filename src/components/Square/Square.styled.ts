import styled from "styled-components";

export const StyledSquare = styled("div")<{ highlight: boolean, occupied: string | null, gameStarted: boolean, clicked: boolean, destroyed: boolean }>(props => `
    width: 50px;
    height: 50px;
    background-color: ${props.highlight ? props.occupied ? 'red' : 'green' : 'transparent'};
    border: 1px solid #999;
    color: #999;
    display: grid;
    place-items: center;
    overflow: hidden;
    ${props.gameStarted ? `
      background-color: ${props.destroyed ? "red" : props.clicked ? props.occupied ? '#fffc93' : '#555' : ''};
      cursor:pointer;
      ${!props.clicked ? `
          &:hover {
            background-color: #444};
          }
        ` : ``}
      ` : ``}
`)