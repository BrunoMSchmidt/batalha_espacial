import { useContext } from 'react';
import { GameState, SpaceShip as SpaceShipType } from '../../types/types';
import SpaceShip from '../SpaceShip/SpaceShip';
import { StyledSpaceShips } from "./SpaceShips.styled";

function SpaceShips(props: {game: GameState}) {
  const { game } = props;

  console.log('RENDER - Spaceships.');

  const spaceShips = game[game.turn].spaceShips;

  return (
    <StyledSpaceShips>
      {spaceShips.filter((spaceShip: any) => !spaceShip.isOnBoard).map((spaceShip: any, index: number) => (
        <SpaceShip key={spaceShip.id} spaceShip={spaceShip} index={index} gameStarted={game.gameStarted} />
      ))}
    </StyledSpaceShips>
  );
}

export default SpaceShips;
