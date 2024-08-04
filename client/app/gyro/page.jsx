'use client';

import React, { useState, useRef, useEffect } from 'react';
import GyroButton from '@/components/GyroButton';
import Countdown from '@/components/Countdown';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [started, setStarted] = useState(false);
  const gyroDataRef = useRef([]);
  const router = useRouter();

  let currentPacket = {}
  let timer = 0;

  const onGyroError = ({ error }) => {
    alert('An error occurred starting the session!');
    console.error(error);
  };

  const onGyroData = ({ data }) => {
    gyroDataRef.current.push(data);
    currentPacket = (data);
  };

  const onStart = () => {
    setStarted(true);
    window.s = gyroDataRef

    timer = setInterval(() => {
      console.log('send data', currentPacket) 
      update();
    }, 1000);
  };

  const update = async () => {
    const response = await fetch(`http://localhost:${8850}/api/gyro_predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gyro_data: currentPacket
      })
    })

  }

  const onEnd = () => {
    localStorage.setItem('gyroData', JSON.stringify(gyroDataRef.current));
    clearInterval(timer)
    router.push('/profile');
  };

  return (
    <div className="container mx-auto py-8 h-full-minus-navbar mt-[66px]">
      <h1>Gyro Testing</h1>
      {started ? (
        <div>
          <Countdown duration={5} onEndCallback={onEnd}></Countdown>
        </div>
      ) : (
        <div>
          <GyroButton
            onErrorCallback={onGyroError}
            onDataCallback={onGyroData}
            onClickCallback={onStart}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
