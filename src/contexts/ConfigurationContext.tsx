import { createContext, useEffect, useRef } from "react";
import { useImmer } from "use-immer";

// create context
const ConfigurationContext = createContext<any>({});

const ConfigurationContextProvider = ({ children }: any) => {

  const api = (window as any)['api'];
  const hasBridgeWithElectron = api && api['send'];

  const defaultConfiguration = {
    volumeEffects: 40,
    volumeMusic: 40,
    showShips: false,
  }
  
  // create immer state for statistics
  const [statistics, setStatistics] = useImmer({});

  const firstRender = useRef(true);
  const [configuration, setConfiguration] = useImmer(defaultConfiguration);
  console.log('provider rendered again', configuration);
  
  function saveConfig(callback: Function) {
    setConfiguration(config => {
      callback(config);
    });
  }

  useEffect(() => {
    if(!firstRender.current){
      saveConfigOnServer();
    }
  }, [configuration])

  function saveConfigOnServer() {
    if(!hasBridgeWithElectron) {
      return ;
    }

    api.send('toMain', { funcao: 'saveConfig', config: configuration });
  }

  async function getConfigFromServer() {
    if(!hasBridgeWithElectron){
      return ;
    }

    api.send('toMain', { funcao: 'getConfig' });
    try {
      const configuration = await new Promise<any>((resolve, reject) => {
        api.receive('fromMain', (resposta: any) => {
          if(resposta.success){
            resolve(resposta.result);
          } else {
            reject();
          }
        })
      });
      setConfiguration(configuration);
    } catch(e) {
      setConfiguration(defaultConfiguration);
    }
  }

  useEffect(() => {
    getConfigFromServer();
    firstRender.current = false;
  }, []);

  return (
    // the Provider gives access to the context to its children
    <ConfigurationContext.Provider value={{configuration, setConfiguration}}>
      {/*<div style={{color: 'white'}}>{JSON.stringify(configuration)}</div>*/}
      {children}
    </ConfigurationContext.Provider>
  );
};

export { ConfigurationContext, ConfigurationContextProvider };