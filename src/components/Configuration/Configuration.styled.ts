import { styled } from "@mui/material/styles"
import { Container } from "@mui/system"
import {Button} from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => `
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  transform: translate(-50%, -50%);
  background-color: #000000c2;
  min-height: 95vh;
  border-radius: 10px;
  border: 3px solid ${theme.palette.primary.main};
`)

export const StyledField = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

export const StyledLabel = styled('label')(({ theme }) => `
  color: ${theme.palette.primary.main};
  font-size: 26px;
  text-decoration: none;
  font-family: ${theme.typography.fontFamily};
  text-align: center;
  align-self: flex-start;
  font-weight: bolder;
`)

export const SliderWrapper = styled('div')`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
`

export const StyledButton = styled(Button)`
  font-size: 24px;
  display: flex;
  gap: 5px;
  font-weight: bold;
`

export const StyledButtonsContainer = styled('div')`
  display: flex;
  margin-top: auto;
  justify-content: space-between;
  margin-bottom: 20px;
`
