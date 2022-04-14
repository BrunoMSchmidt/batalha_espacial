import { spaceShip } from "../../types/types"
import SpaceShip from "./SpaceShip/SpaceShip";

type SpaceShipProps = {
  spaceShips: spaceShip[],
  gameStateDispatcher: Function
}

function SpaceShips({spaceShips, gameStateDispatcher}: SpaceShipProps){

  console.log('RENDER - Spaceships.');

  return (
    <div className="spaceships">
      {spaceShips.filter(spaceShip => !spaceShip.isOnBoard).map((spaceShip, index) => (
        <SpaceShip key={spaceShip.id} gameStateDispatcher={gameStateDispatcher} spaceShip={spaceShip} index={index} />
      ))}  
    </div>
  )
}

export default SpaceShips;