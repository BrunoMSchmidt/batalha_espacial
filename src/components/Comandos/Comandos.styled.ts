import { Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles"

export const StyledContainer = styled('div')`
  height: 100%;
  width: 100%;
  background-color: #00000033;
  display: grid;
  place-items: center;
`

export const StyledContent = styled('div')(({ theme }) =>`
  position: relative;
  background-color: #00000066;
  padding: 35px;
  border: 2px solid ${theme.palette.primary.main};
  border-radius: 10px;
  width: min(600px, 98vw);
  display: flex;
  flex-direction: column;
`)

export const StyledText = styled('h1')(({ theme }) =>`
  color: ${theme.palette.primary.main};
  font-family: ${theme.typography.fontFamily};
  font-weight: bolder;
  text-align: center;
  margin: 0px 0px 15px 0;
  font-size: 38px;
`)

export const StyledRuleWrapper = styled('div')(({ theme }) => `
  background-color: ${theme.palette.primary.main}; 
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 15px;
  position: relative;
  font-size: 21px;
  justify-content: center;
  margin: 8px 0;

  img {
    position: absolute;
    top: 2px;
    left: 15px;
    width: 46px;
    object-fit: contain;
  }
`);

export const StyledClose = styled(Close)(({ theme }) => `
  position: absolute;
  top: 15px;
  right: 15px;
  color: ${theme.palette.primary.main};
  font-size: 50px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`)
