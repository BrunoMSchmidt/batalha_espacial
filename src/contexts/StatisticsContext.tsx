import { createContext, useEffect, useRef } from "react";
import { useImmer } from "use-immer";
import { Statistics } from "../types/types";

// create context
const StatisticsContext = createContext<any>(null);

const StatisticsContextProvider = ({ children }: any) => {

  const api = (window as any)['api'];
  const hasBridgeWithElectron = api && api['send'];
  const firstRender = useRef(true);

  const defaultStatistics: Statistics = {
    gamesPlayed: {
      player1: 0,
      player2: 0,
      computer: 0,
    },
    wins: {
      player1: 0,
      player2: 0,
      computer: 0
    },
    losses: {
      player1: 0,
      player2: 0,
      computer: 0
    },
    spaceshipsDestroyed: {
      player1: 0,
      player2: 0,
      computer: 0
    },
    shotsMissed: {
      player1: 0,
      player2: 0,
      computer: 0
    },
    shotsHit: {
      player1: 0,
      player2: 0,
      computer: 0
    }
  }
  
  const [statistics, setStatistics] = useImmer(defaultStatistics);

  useEffect(() => {
    if(!firstRender.current) {
      saveStatisticsOnServer();
    }
  })

  useEffect(() => {
    setTimeout(() => {
      getStatisticsFromServer();
    }, 50)
    firstRender.current = false
  }, []);

  function saveStatisticsOnServer() {
    if(!hasBridgeWithElectron) {
      return ;
    }

    api.send('toMain', { function: 'saveStatistics', statistics: statistics });
  }

  const increment = (statistic: string, player: string) => {
    setStatistics((statistics: any) => { // TODO: fix type
      statistics[statistic][player]++;
    });
  }

  async function getStatisticsFromServer() {
    if(!hasBridgeWithElectron){
      return ;
    }
    try {
      api.send('toMain', { function: 'getStatistics' });
      const statisticsFromServer = await new Promise<any>((resolve, reject) => {
        api.receive('fromMain', (resposta: any) => {
          console.log(resposta, "AQUI");
          if(resposta.success){
            resolve(resposta.result);
          } else {
            reject();
          }
        })
      });
      setStatistics(statisticsFromServer);
      console.log(statistics);
    } catch(e) {
      setStatistics(defaultStatistics);
    }
  }

  return (
    // the Provider gives access to the context to its children
    <StatisticsContext.Provider value={{statistics, setStatistics, increment}}>
      {/*<div style={{color: 'white'}}>{JSON.stringify(configuration)}</div>*/}
      {children}
    </StatisticsContext.Provider>
  );
};

export { StatisticsContext, StatisticsContextProvider };