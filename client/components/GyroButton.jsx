'use client'
import React, { useState, useEffect } from 'react';

const serviceUUID = "6a8c2fe2-31f5-45d7-96cd-2920dd0645e7";
const characterUUID = "3d13c8c6-2d96-4868-b17e-2814209874b5";

async function onButtonClick() {
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
      const result = decoder.decode(value);
      console.log(result);
    });
  } catch (error) {
    console.log("Argh! " + error);
  }
}

const GyroButton = () => {
  return (
    <button onClick={onButtonClick}>
      Connect to Gyroscope
    </button>
  );
};

export default GyroButton;
