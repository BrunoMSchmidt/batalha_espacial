import React, {createContext, useContext, useEffect, useRef} from "react";

import Hover from '../assets/sounds/Hover.mp3';
import PreGameSoundtrack from '../assets/sounds/Pre-Game Soundtrack.mp3';
import Select from '../assets/sounds/Select.mp3';
import Hit from "../assets/sounds/hit_shot.mp3";
import Miss from "../assets/sounds/miss_shot.mp3";
import PickSpaceship from "../assets/sounds/pick_spaceship1.mp3";
import StartGame from "../assets/sounds/start_game.mp3";
import HoverSquares from "../assets/sounds/hover_squares.mp3";
import {ConfigurationContext} from "./ConfigurationContext";
import { Sound, SoundNames } from "../types/types";
import { matchPath, matchRoutes, useLocation } from "react-router-dom";

const SoundContext = createContext<any>(null);

const sounds: Sound[] = [
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
    },
    {
        name: 'hit',
        sound: Hit,
        type: 'effect'
    },
    {
        name: 'miss',
        sound: Miss,
        type: 'effect'
    },
    {
        name: 'pickSpaceship',
        sound: PickSpaceship,
        type: 'effect'
    },
    {
        name: 'startGame',
        sound: StartGame,
        type: 'effect'
    },
    {
        name: 'hoverSquare',
        sound: HoverSquares,
        type: 'effect'
    }
]

type soundElementType = {
    [key in SoundNames]: HTMLAudioElement;
};

const SoundContextProvider = ({children}: any) => {
    const { configuration } = useContext(ConfigurationContext);

    const location = useLocation();

    const soundElements = useRef<soundElementType>();

    useEffect(() => {
        if(location) {

            if(matchPath('game/:opponent', location.pathname)){
                console.log("MATHCHOEUS");
            }
            
        }
    }, [location])

    useEffect(() => {
        initSoundElements();
        console.log(soundElements);
    }, []);

    useEffect(() => {
        sounds.forEach(sound => {
            if(soundElements.current){
                soundElements.current[sound.name].volume = (sound.type == "music" ? configuration.volumeMusic || 0 : configuration.volumeEffects || 0) / 100;
            }
        })
    }, [configuration.volumeMusic, configuration.volumeEffects])
    
    function initSoundElements() {
        if(soundElements.current) {
            return ;
        }

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

    const playAudio = (name: SoundNames) => {
        if(!soundElements.current){
            setTimeout(() => {
                stopAudio(name);
            }, 500)
            return ;
        }
        const el = soundElements.current[name];
        el.currentTime = 0
        el.play();
    }

    const stopAudio = (name: SoundNames) => {
        if(!soundElements.current){
            setTimeout(() => {
                stopAudio(name);
            }, 500)
            return ;
        }
        const el = soundElements.current[name];
        el.pause();
        el.currentTime = 0;
    }

    return (
        <SoundContext.Provider value={{ playAudio, stopAudio }}>
            {/* <div style={{color: 'white'}}>{JSON.stringify(configuration)}</div> */}
            { children }
        </SoundContext.Provider>
    )
}

export { SoundContextProvider, SoundContext };