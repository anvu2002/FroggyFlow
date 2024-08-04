'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { websiteName } from '@/config';
import { useInView } from 'react-intersection-observer';
import Countdown from '@/components/Countdown';

const serviceUUID = "6a8c2fe2-31f5-45d7-96cd-2920dd0645e7";
const characterUUID = "3d13c8c6-2d96-4868-b17e-2814209874b5";

const Page = () => {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(5);
  const [badPosture, setBadPosture] = useState(0);
  const gyroDataRef = useRef([]);

  let currentPacket = {}
  let timerInterval = 0;
  let dataInterval = 0;

  const handleButtonClick = async () => {
    if (started) {
      localStorage.removeItem('gyroData');
      clearInterval(timerInterval);
      clearInterval(dataInterval);
      router.push('/profile');
      return;
    }

    console.log("Requesting froggyflow Bluetooth Device...");
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ name: "froggyflow" }],
      optionalServices: [serviceUUID],
    });

    console.log("Connecting to GATT Server...");
    const server = await device.gatt.connect();

    console.log("Getting Service...");
    const service = await server.getPrimaryService(serviceUUID);

    console.log("Getting Characteristic...");
    const characteristic = await service.getCharacteristic(characterUUID);

    characteristic.startNotifications();

    characteristic.addEventListener("characteristicvaluechanged", (event) => {
      const value = event.target.value;
      const decoder = new TextDecoder("utf-8");
      const text = decoder.decode(value);
      const split = text.split(",")

      const data = [...split.map((item) => parseFloat(item)), Date.now()]

      gyroDataRef.current.push(data);
      currentPacket = (data);
    });

    setStarted(true);

    timerInterval = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timerInterval);
          timerDone();
          return 0;
        } else return time - 1;
      });
    }, 1000);

    dataInterval = setInterval(() => {
      update();
    }, 1000);

  }

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

    const text = await response.text();

    if(text == "good") {
      console.log("YAY :)")
      setBadPosture(0);
    } else if(text == "bad") {
      console.log("SAD :(")
      setBadPosture(badPosture + 1);
      if(badPosture == 5) {
        console.log('FIVE BAD POSTURE IN A ROW :(((')
      }
    }
  }

  const timerDone = async () => {

    const response = await fetch(`http://localhost:${8850}/api/session_summary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gyro_data: gyroDataRef
      })
    })

    localStorage.setItem('gyroData', JSON.stringify(gyroDataRef.current));
    clearInterval(timerInterval);
    clearInterval(dataInterval);
    router.push('/profile');
  };

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover bg-center flex justify-center items-center'
        style={{ backgroundImage: "url('/frog_background.png')", height: '100vh', backgroundPosition: 'center bottom' }}
      >
        <div className='text-center'>
          <motion.h1
            className='sm:text-6xl font-extrabold text-gray-800 text-5xl'
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span style={{ color: '#ffff66' }}>
              {`${Math.floor(time / 60)}`.padStart(2, 0)}:{`${time % 60}`.padStart(2, 0)}
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-white mt-8 font-bp"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            You'll be reminded to take breaks every 30 minutes!
          </motion.p>
          <motion.button
            className="mt-8 px-6 py-3 text-lg font-semibold text-sky-950 bg-green-300 rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            onClick={handleButtonClick}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {started ? "End session" : "Start session"}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Page;
