'use client'
import React, { useState, useEffect } from 'react';

const Countdown = ({ duration, onEndCallback }) => {

  // 30 minute timer
 
  const [time, setTime] = useState(duration);
  let started = false;

  useEffect(() => {
    if(started) {
      return;
    }

    started = true;

    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          onEndCallback();
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);

  return (
    <h1>
      {`${Math.floor(time / 60)}`.padStart(2, 0)}:{`${time % 60}`.padStart(2, 0)}
    </h1>
  );
}

export default Countdown;