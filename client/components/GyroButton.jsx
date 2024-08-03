'use client'
import React, { useState, useEffect } from 'react';

const serviceUUID = "6a8c2fe2-31f5-45d7-96cd-2920dd0645e7";
const characterUUID = "3d13c8c6-2d96-4868-b17e-2814209874b5";

const GyroButton = ({ onErrorCallback, onDataCallback, onClickCallback }) => {

  async function onGyroClick() {
    try {
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
  
        const data = {
          accelerometer: {
            x: parseFloat(split[0]),
            y: parseFloat(split[1]),
            z: parseFloat(split[2])
          },
          gyroscope: {
            x: parseFloat(split[3]),
            y: parseFloat(split[4]),
            z: parseFloat(split[5])
          },
          timestamp: Date.now()
        }
  
        onDataCallback({ data })
      });
  
      onClickCallback();
    } catch (error) {
      onErrorCallback({ error })
    }
  }

  return (
    <button onClick={onGyroClick}>
      Connect to Gyroscope
    </button>
  );
};

export default GyroButton;
