import styled from "styled-components";

export const StyledBoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: flex-start;
  max-height: 500px;
  overflow: hidden;
`

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledTitle = styled.h1`
  color: #fffc93;
  font-size: 40px;
  text-decoration: none;
  font-family: 'Playfair Display', sans-serif;
  -webkit-text-stroke: 1px #fffc93;
  text-align: center;
`

export const StyledOption = styled("h2")<{ disabled: boolean }>(props => `
  color: #fffc93;
  font-size: 50px;
  text-decoration: none;
  width: fit-content;
  margin: auto;
  font-family: 'Playfair Display', sans-serif;
  -webkit-text-stroke: 1px #fffc93;
  text-align: center;
  cursor: pointer;
  transition: all 150ms ease-out;
  
  ${props.disabled ? `
    filter: opacity(.5) brightness(.7);
    pointer-events: none;
  ` : `
    &:hover {
        color: black;
        transform: scale(1.1);
        text-shadow:
          3px 3px 0 #fffc93,
          -1px -1px 0 #fffc93,
          1px -1px 0 #fffc93,
          -1px 1px 0 #fffc93,
          1px 1px 0 #fffc93;
    }
  `}
`)
