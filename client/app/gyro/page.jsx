'use client';

import React, { useState, useEffect } from 'react';

import GyroButton from '@/components/GyroButton';
import Countdown from '@/components/Countdown';

const Page = () => {

  const [started, setStarted] = useState(false);
  const sessionData = []

  const onGyroError = ({ error }) => {
    alert("An error occurred starting the session!");
    console.error(error)
  }

  const onGyroData = ({ data }) => {
    sessionData.push(data);
  }

  const onStart = () => {
    setStarted(true)
    window.s = sessionData
  }

  const onEnd = () => {
    alert("publish data")
  }

  return (
    <div className="container mx-auto py-8 h-full-minus-navbar mt-[66px]">
      <h1>Gyro Testing</h1>
      {started ? <div><Countdown duration={5} onEndCallback={onEnd}></Countdown></div> : <div><GyroButton onErrorCallback={onGyroError} onDataCallback={onGyroData} onClickCallback={onStart} /></div>}

    </div>
  );
};

export default Page;
