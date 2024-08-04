#include <ArduinoBLE.h>
#include <Arduino_LSM6DSOX.h>


BLEService myService("6a8c2fe2-31f5-45d7-96cd-2920dd0645e7");
BLEStringCharacteristic StringC("3d13c8c6-2d96-4868-b17e-2814209874b5", BLERead | BLEBroadcast | BLENotify, 128);

float Ax, Ay, Az;
float Gx, Gy, Gz;

unsigned long lastTime;

void setup() {
  Serial.begin(9600);

  if (!BLE.begin()) {
    Serial.println("failed to initialize BLE!");
    while (1);
  }


  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1);
  }

  myService.addCharacteristic(StringC);
  BLE.addService(myService);


  // Build scan response data packet
  BLEAdvertisingData scanData;
  scanData.setLocalName("froggyflow");
  // Copy set parameters in the actual scan response packet
  BLE.setScanResponseData(scanData);

  BLE.advertise();
  

  Serial.println("advertising ...");

  lastTime = millis();
}

void loop() {
  BLE.poll();

  if (millis() - lastTime >= 1000)
  {
    //restart this TIMER
    lastTime = millis();

    if (IMU.accelerationAvailable()) {
      IMU.readAcceleration(Ax, Ay, Az);
    }

    if (IMU.gyroscopeAvailable()) {
      IMU.readGyroscope(Gx, Gy, Gz);
    }

    Ax *= -1;
    Gx *= -1;

    StringC.writeValue("" + String(Ax) + "," + String(Ay) + "," + String(Az) + "," + String(Gx) + "," + String(Gy) + "," + String(Gz));
  }

}
