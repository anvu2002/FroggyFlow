'use client';

import React, { useState, useRef } from 'react';
import GyroButton from '@/components/GyroButton';
import Countdown from '@/components/Countdown';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [started, setStarted] = useState(false);
  const gyroDataRef = useRef([]);
  const router = useRouter();

  const onGyroError = ({ error }) => {
    alert('An error occurred starting the session!');
    console.error(error);
  };

  const onGyroData = ({ data }) => {
    gyroDataRef.current.push(data);
  };

  const onStart = () => {
    setStarted(true);
  };

  const onEnd = () => {
    localStorage.setItem('gyroData', JSON.stringify(gyroDataRef.current));
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
