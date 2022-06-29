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
    hideRulesModal: false
  }

  const firstRender = useRef(true);
  const [configuration, setConfiguration] = useImmer(defaultConfiguration);
  console.log('provider rendered again', configuration);
  
  function saveConfig(configToSave: any) {
    setConfiguration(config => ({...config, ...configToSave}));
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

    console.log("SAVING CONFIG ON SERVER", configuration)

    api.send('toMain', { function: 'saveConfig', config: configuration });
  }

  async function getConfigFromServer() {
    if(!hasBridgeWithElectron){
      return ;
    }

    api.send('toMain', { function: 'getConfig' });
    try {
      const configuration = await new Promise<any>((resolve, reject) => {
        api.receive('fromMain', (resposta: any) => {
          console.log("config resposta", resposta);
          if(resposta.success){
            resolve(resposta.result);
          } else {
            console.log("ERRO AQUI");
            reject();
          }
        })
      });
      console.log("pEGOU CONFIG", configuration);
      setConfiguration(configuration);
    } catch(e) {
      console.log("pEGOU CONFIG DEU ERRO", configuration);

      setConfiguration(defaultConfiguration);
    }
  }

  useEffect(() => {
    getConfigFromServer();
    firstRender.current = false;
  }, []);

  return (
    // the Provider gives access to the context to its children
    <ConfigurationContext.Provider value={{configuration, saveConfig}}>
      {/*<div style={{color: 'white'}}>{JSON.stringify(configuration)}</div>*/}
      {children}
    </ConfigurationContext.Provider>
  );
};

export { ConfigurationContext, ConfigurationContextProvider };