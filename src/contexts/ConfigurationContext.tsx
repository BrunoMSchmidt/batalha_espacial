import React, { createContext, useState, useEffect } from "react";
import { useImmer } from "use-immer";

// create context
const ConfigurationContext = createContext({});

const ConfigurationContextProvider = ({ children }: any) => {

  const api = (window as any)['api'];
  const hasBridgeWithElectron = api && api['send'];

  const defaultConfiguration = {
    volumeEffects: true,
    volumeMusic: true,
    showShips: false,
  }
  
  // the value that will be given to the context
  const [configuration, setConfiguration] = useImmer(defaultConfiguration);
  console.log('provider rendered again', configuration);
  
  function saveConfig(config: any) {
    setConfiguration(config);
    saveConfigOnServer(config);
  }

  function saveConfigOnServer(config: any) {
    if(!hasBridgeWithElectron) {
      return ;
    }

    api.send('toMain', { funcao: 'saveConfig', config: config });
  }

  async function getConfigFromServer() {
    if(!hasBridgeWithElectron){
      return ;
    }

    api.send('toMain', { funcao: 'getConfig' });
    const configuration = await new Promise<any>((resolve, reject) => {
      api.receive('fromMain', (resposta: any) => {
        if(resposta.success){
          resolve(resposta.result);
        }
      })
    });
    setConfiguration(configuration);
  }

  // fetch a user from a fake backend API
  useEffect(() => {
    getConfigFromServer();

    setTimeout(() => {
      saveConfig({...defaultConfiguration, teste: "Bruno"})
    }, 8000);
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