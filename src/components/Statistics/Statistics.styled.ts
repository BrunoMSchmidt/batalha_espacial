import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Container)`

`

export const StyledTable = styled("table")(({ theme }) => `
  width: 100%;
  border-spacing: 15px;
  border-radius: 15px;
  border: 3px solid;
  color: ${theme.palette.primary.main};
  text-align: center;
  background-color: #000000dd;

  th {
    font-size: 28px;

    &:first-child {
      text-align: left;
    }
  }
  td {
    font-size: 26px;
    line-height: 45px;
    &:first-child {
      text-align: left;
    }

    &:not(:first-child) {
      font-size: 32px
    }
  }
`);

export const StyledStatisticsWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const StyledStatisticTitle = styled('div')(({theme}) => `
  font-size: 36px;
  color: ${theme.palette.primary.main};
  font-weight: bold;
  margin: auto;
`)


export const StyledStatistic = styled('div')(({theme}) => `
  font-size: 24px;
  color: ${theme.palette.primary.main};
`)

