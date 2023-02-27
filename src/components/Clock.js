import { useState, useEffect, useRef } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [lastTimeConection, setLastTimeConection] = useState('2023-02-26T21:08:59Z');
  const [seconds, setSeconds] = useState(0);

  const secondsRef = useRef(seconds);

  const getElapsedSeconds = () => {
    const lastTime = new Date(lastTimeConection);
    const currentTime = new Date();
    const elapsedSeconds = Math.round((currentTime - lastTime) / 1000);
    console.log('desde getElapsedSeconds ', elapsedSeconds)
    secondsRef.current = elapsedSeconds;
    setSeconds(elapsedSeconds); 
  }

  const getHours = () => {
    console.log('desde getHours');
    return Math.floor(seconds / 60 / 60);
  }
  
  const getMinutes = () => { 
    console.log('desde getMinutes');
    return Math.floor((seconds / 60) % 60);
  }

  const getSeconds = () => {
    console.log('desde getSeconds');
    return Math.floor(seconds % 60);
  }


  const sumTime = () => {
    secondsRef.current ++;
    setSeconds(secondsRef.current);
  }
 
  useEffect(() => {
    getElapsedSeconds();
    const interval = setInterval(() => sumTime(), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock">
        {time.toLocaleTimeString()}
      { lastTimeConection && <span>Last connection {lastTimeConection} </span> }
      <span>elapsed time {`${getHours()}:${getMinutes()}:${getSeconds()}`} </span>
    </div>
  )
}