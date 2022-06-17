import { css, keyframes, styled } from "@mui/material/styles";

export const StyledContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: center;
  align-items: center;
`

const blinker = keyframes`
  50% {
    transform: scale(1.1);
  }
`;

export const StyledTitle = styled('h1')(({ theme }) => css`
  color: ${theme.palette.primary.main};
  font-size: 80px;
  font-family: ${theme.typography.fontFamily};
  cursor: default;
  user-select: none;
  text-decoration: underline;
  animation: ${css`${blinker} 5s infinite`};
  transition: 200ms;
`)


export const StyledOptions = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

export const StyledOption = styled('h2')(({ theme }) => `
  color: ${theme.palette.primary.main};
  font-size: 80px;
  margin: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: ${theme.typography.fontFamily};
  transition: all 150ms ease-out;

  &:hover {
    color: black;
    transform: scale(1.1);
    text-shadow:
      3px 3px 0 ${theme.palette.primary.main},
      -1px -1px 0 ${theme.palette.primary.main},  
      1px -1px 0 ${theme.palette.primary.main},
      -1px 1px 0 ${theme.palette.primary.main},
      1px 1px 0 ${theme.palette.primary.main};
  }
`)
