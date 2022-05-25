import { useContext } from 'react';
import GameContext from '../../contexts/GameContext';
import { SpaceShip as SpaceShipType } from '../../types/types';
import SpaceShip from '../SpaceShip/SpaceShip';
import { StyledSpaceShips } from "./SpaceShips.styled";

function SpaceShips() {
  console.log('RENDER - Spaceships.');

  const [game] = useContext(GameContext);

  const spaceShips = game[game.turn].spaceShips;

  return (
    <StyledSpaceShips>
      {spaceShips.filter((spaceShip: any) => !spaceShip.isOnBoard).map((spaceShip: any, index: number) => (
        <SpaceShip key={spaceShip.id} spaceShip={spaceShip} index={index} />
      ))}
    </StyledSpaceShips>
  );
}

export default SpaceShips;
