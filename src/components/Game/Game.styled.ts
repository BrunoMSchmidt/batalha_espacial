import { styled } from "@mui/material/styles";
import { ArrowBackIos } from "@mui/icons-material";

export const StyledBackWrapper = styled("div")(({ theme }) => `
  position: absolute;
  top: 25px;
  left: 25px;
  display: flex;
  gap: 5px;
  border-radius: 50%;
  box-shadow: 0 0 2px 2px ${theme.palette.primary.main};
  padding: 5px;
  cursor: pointer;
  transition: 150ms;

  &:hover {
    transform: scale(1.2);
  }

  svg {
    font-size: 40px;
    color: ${theme.palette.primary.main};
  }
`)

export const StyledBackIcon = styled(ArrowBackIos)(({ theme }) => `
  font-size: 42px;
  color: ${theme.palette.primary.main};
  transition: 100ms;
`)

export const StyledBoardWrapper = styled("div")`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: flex-start;
  max-height: 500px;
  overflow: hidden;
`

export const StyledContainer = styled("div")`
  display: flex;
  flex-direction: column;
`

export const StyledTitle = styled("h1")(({ theme }) => `
  color: ${theme.palette.primary.main};
  font-size: 40px;
  text-decoration: none;
  font-family: ${theme.typography.fontFamily};
  -webkit-text-stroke: 1px ${theme.palette.primary.main};
  text-align: center;
`)

export const StyledOption = styled("h2")<{ disabled?: boolean, size?: "small" | "normal", color?: string }>(props => `
  color: ${props.theme.palette.primary.main};
  font-size: ${props.size == 'small' ? '33px' : '46px'};
  text-decoration: none;
  width: fit-content;
  margin: auto;
  font-family: ${props.theme.typography.fontFamily};
  text-align: center;
  cursor: pointer;
  transition: all 150ms ease-out;

  ${props.color ? `color: ${props.color};` : ''}
  
  ${props.disabled ? `
    filter: opacity(.5) brightness(.7);
    pointer-events: none;
  ` : `
    &:hover {
        color: black;
        transform: scale(1.1);
        text-shadow:
          3px 3px 0 ${props.theme.palette.primary.main},
          -1px -1px 0 ${props.theme.palette.primary.main},
          1px -1px 0 ${props.theme.palette.primary.main},
          -1px 1px 0 ${props.theme.palette.primary.main},
          1px 1px 0 ${props.theme.palette.primary.main};
    }
  `}
`)
