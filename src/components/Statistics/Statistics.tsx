import { ArrowBack } from "@mui/icons-material";
import { Tooltip, Zoom } from "@mui/material";
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { StatisticsContext } from "../../contexts/StatisticsContext";
import { StyledBackWrapper, StyledTitle } from "../Game/Game.styled"
import { StyledContainer, StyledStatistic, StyledStatisticsWrapper, StyledStatisticTitle, StyledTable } from "./Statistics.styled"

const Statistics = () => {
  const navigate = useNavigate();

  const { statistics }: { statistics: any } = useContext(StatisticsContext);

  const descriptions: any = {
    wins: "Vitórias",
    losses: "Derrotas",
    spaceshipsDestroyed: "Naves destruídas",
    shotsMissed: "Tiros errados",
    shotsHit: "Tiros acertados",
    gamesPlayed: "Partidas jogadas",
    computer: "Computador",
    player1: "Jogador 1",
    player2: "Jogador 2",
  }

  const navigateBack = () => {
    navigate("/");
  }

  return (
    <>
      <Tooltip title="Voltar">
            <StyledBackWrapper
              onClick={navigateBack}
            >
              <ArrowBack htmlColor="orange" fontSize="large"></ArrowBack>
            </StyledBackWrapper>
          </Tooltip>
      <Zoom in={true}>
        <StyledContainer>
          <StyledTitle>Estatísticas</StyledTitle>
            <StyledTable>
              <thead>
                <th> </th>
                <th>Jogador 1</th>
                <th>Jogador 2</th>
                <th>Computador</th>
              </thead>
              <tbody>
              <tr>
                <td>Vitórias</td>
                <td>{statistics.wins.player1}</td>
                <td>{statistics.wins.player2}</td>
                <td>{statistics.wins.computer}</td>
              </tr>
              <tr>
                <td>Derrotas</td>
                <td>{statistics.losses.player1}</td>
                <td>{statistics.losses.player2}</td>
                <td>{statistics.losses.computer}</td>
              </tr>
              <tr>
                <td>Naves destruídas</td>
                <td>{statistics.spaceshipsDestroyed.player1}</td>
                <td>{statistics.spaceshipsDestroyed.player2}</td>
                <td>{statistics.spaceshipsDestroyed.computer}</td>
              </tr>
              <tr>
                <td>Tiros errados</td>
                <td>{statistics.shotsMissed.player1}</td>
                <td>{statistics.shotsMissed.player2}</td>
                <td>{statistics.shotsMissed.computer}</td>
              </tr>
              <tr>
                <td>Tiros acertados</td>
                <td>{statistics.shotsHit.player1}</td>
                <td>{statistics.shotsHit.player2}</td>
                <td>{statistics.shotsHit.computer}</td>
              </tr>
              <tr>
                <td>Partidas jogadas</td>
                <td>{statistics.gamesPlayed.player1}</td>
                <td>{statistics.gamesPlayed.player2}</td>
                <td>{statistics.gamesPlayed.computer}</td>
              </tr>
            </tbody>
            </StyledTable>
        </StyledContainer>
      </Zoom>
    </>
  )
}

export { Statistics }