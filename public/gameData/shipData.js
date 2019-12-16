/*
   SHIP DATA:
*/

// name, size, power, durability, value, refreshrate, desc
import { Motor, ShipGun, ShipModule, Hull } from '../classes.js';

export const hulls = [
  // name, width, height, armours, maxModules, gunMounts, value, desc
  //         name,    w,  h,  armours                            maxModules,   guns, value, desc  
  new Hull('Zaab 01', 20, 8, {front: 16, sides: 16, back: 11}, 10, {front: 1, star: 2, port: 2}, 1000,
          'Reliable classic starship hull.'),
  new Hull('Zaab 02', 30, 15, {front: 16, sides: 16, back: 11}, 13, {front: 2, star: 3, port: 3}, 2500,
          'Extended version of classic Zaab 01.'),
  new Hull('Juggernaut', 45, 25, {front: 18, sides: 16, back: 15}, 23, {front: 3, star: 4, port: 4}, 4500,
          'Huge starship hull capable to hold lots of cannons and modules.')
];

export const motors = [
  new Motor('Vartzila Space 1', 1, 10, 95, 1000, 1, 'Reliable but not very powerful engine.'),
  new Motor('Vartzila Military', 2, 20, 95, 4000, 3, 'Great military class motor.')
];
// name, reloadTime, energyUsage, power, shieldPiercing, color, speed, range, value, desc
export const shipGuns = [
  new ShipGun('ValMet S1', 10, 2, 12, 0, 'red', 20, 400, 300, 'good self-defence gun.'),
  new ShipGun('Spaceviper', 15, 4, 16, 1, 'cyan', 20, 400, 1000, 'great gun.')
];
/*
    this.name = name; this.size = size; this.energyUsage = energyUsage, this.power = power; moduleType, value, this.desc = desc;
}
*/
export const shipModules = [
  new ShipModule('Arcanis Shield', 1, 0, 10, 'shield', 1000, 'Basic energy shield. Protects pretty ok damage')
];