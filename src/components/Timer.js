import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; 
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import SettingButton from './SettingButton';
import { useState, useContext, useEffect, useRef } from 'react';
import SettingsContext from '../contexts/SettingContext';


const red = '#f54e4e';
const green = '#4aec8c';

function Timer () {

    const settingsInfo = useContext(SettingsContext);
    const [isPaused, setIsPaused] = useState(false);
    const [mode, setMode] = useState('work'); // ~ work/break/null
    const [secondsLeft, setSecondsLeft] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    const initialTimer = () => {
        setSecondsLeft(settingsInfo.workMinutes * 60);
    }

    const switchMode = () => {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextSecond = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
        setMode(nextMode);
        modeRef.current = nextMode;
        setSecondsLeft(nextSecond);
        secondsLeftRef.current = nextSecond;
    };

    const tick = () => {
        secondsLeftRef.current --;
        setSecondsLeft(secondsLeftRef.current);
    };

    useEffect(() => {
        initialTimer();

        const interval = setInterval(() => {
            if(isPausedRef.current) return;

            if(secondsLeftRef.current === 0) {
                return switchMode();
            }

            tick()

        },1000)

        return () => clearInterval(interval);
    },[settingsInfo]);

    const totalSecodns = mode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
    const percentage = Math.round(secondsLeft / totalSecodns * 100);

    const minutes = Math.round(secondsLeft / 60); //44,8
    let seconds = secondsLeft % 60;
    if(seconds < 10) seconds =  `0${seconds}`;

    return(
        <div>
            <CircularProgressbar 
            value={percentage} 
            text={`${minutes}:${seconds}`} 
            styles={buildStyles({
                textColor: '·fff',
                pathColor:  mode === 'work' ? red : green,
                trailColor: 'rgba(255, 255, 255, 0.2)',
            })}/>
            <div style={{marginTop: '20px'}}>
                { isPaused 
                    ? <PlayButton 
                        onClick={() => { setIsPaused(!isPaused); isPausedRef.current = !isPausedRef.current }}
                    /> 
                    : <PauseButton 
                        onClick={() => { setIsPaused(!isPaused); isPausedRef.current = !isPausedRef.current }}
                    /> }
            </div>
            <div style={{marginTop: '20px'}}>
                <SettingButton onClick={settingsInfo.handleSettingsPanel}/>
            </div>
        </div>
    ) 
}

export default Timer; 
