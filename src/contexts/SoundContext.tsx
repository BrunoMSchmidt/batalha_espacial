import React, {createContext, useContext, useEffect, useRef} from "react";

import Hover from '../assets/sounds/Hover.mp3';
import PreGameSoundtrack from '../assets/sounds/Pre-Game Soundtrack.mp3';
import Select from '../assets/sounds/Select.mp3';
import {useRoutes} from "react-router-dom";
import {ConfigurationContext} from "./ConfigurationContext";

const SoundContext = createContext<any>(null);

const sounds = [
    {
        name: 'hover',
        sound: Hover,
        type: 'effect'
    },
    {
        name: 'preGameSoundtrack',
        loop: true,
        sound: PreGameSoundtrack,
        autoplay: true,
        type: 'music'
    },
    {
        name: 'select',
        sound: Select,
        type: 'effect'
    }
]

type soundElementType = {
    hover: HTMLAudioElement,
    preGameSoundtrack: HTMLAudioElement,
    select: HTMLAudioElement,
}

type soundType = 'hover' | 'preGameSoundtrack' | 'select';

const SoundContextProvider = ({children}: any) => {

    // @ts-ignore
    const { configuration } = useContext(ConfigurationContext);

    const soundElements = useRef<soundElementType>();

    useEffect(() => {
        initSoundElements();
    }, [])

    function clearSongs() {
        console.log('rodou');
        
        Object.keys(soundElements.current || {}).forEach(key => {
            // @ts-ignore
            const el: HTMLAudioElement = soundElements.current[key];
            el.pause();
        })
    }

    function initSoundElements() {
        const auxSoundElements: any = {};
        sounds.forEach(sound => {
            let el = document.createElement('audio');
            if(sound.loop){
                el.loop = true;
            }
            if(sound.autoplay){
                el.autoplay = true;
            }
            el.src = sound.sound

            auxSoundElements[sound.name] = el;
        })
        soundElements.current = auxSoundElements;
    }

    const playAudio = (name: soundType) => {
        const el = soundElements.current![name];
        if(!el.loop || el.paused){
            el.volume = 0.1;
            el.currentTime = 0;
            el.play();
        }
    }

    const stopAudio = (name: soundType) => {
        const el = soundElements.current![name];
        el.pause();
        el.currentTime = 0;
    }

    return (
        <SoundContext.Provider value={{ playAudio, stopAudio }}>
            <div style={{color: 'white'}}>{JSON.stringify(configuration)}</div>
            { children }
        </SoundContext.Provider>
    )
}

export { SoundContextProvider, SoundContext };