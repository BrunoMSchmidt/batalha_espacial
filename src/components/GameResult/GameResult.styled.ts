import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledContainer = styled('div')(({ theme }) =>`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`)

const StyledContent = styled('div')(({ theme }) =>`
  background-color: #00000066;
  padding: 35px;
  border: 2px solid ${theme.palette.primary.main};
  border-radius: 10px;
  width: min(600px, 98vw);
  height: 360px;
  display: flex;
  flex-direction: column;
`)

const StyledText = styled('h1')(({ theme }) =>`
  color: ${theme.palette.primary.main};
  font-family: ${theme.typography.fontFamily};
  font-weight: bolder;
  text-align: center;
  margin: 0;
  font-size: 44px;
`)

const StyledButtonsContainer = styled('div')(({ theme }) =>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: fit-content;
  margin-inline: auto;
`)

const StyledButton = styled(Button)(({ theme }) => `
  font-weight: bold;
  font-size: 22px;
  width: 100%;
  transition: 150ms;
  &:hover {
    box-shadow: 0px 0px 10px 1px ${theme.palette.primary.main}
  }
`)


export { StyledContainer, StyledContent, StyledText, StyledButtonsContainer, StyledButton }