let launchReady = false;
let fuelLevel = 17000;
if (fuelLevel >= 20000) {  // Se añadió el paréntesis que faltaba
   console.log('Fuel level cleared.');
   launchReady = true;
} else {
   console.log('WARNING: Insufficient fuel!');
   launchReady = false;
}