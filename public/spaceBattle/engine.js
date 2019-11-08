/*
  propably lots of experimental stuff first...
*/
import { Starship, Hull, Motor, Shipgun, Module }
const 
// place for gameObject
let gameObject = null;

window.onload( () => {
  // load gameObject from store
  gameObject = JSON.parse(localStorage.getItem('Go'));

  
});

/*

export class Starship extends AllRects {
  constructor(name, hull, motor, modules, weapons){
    super();
    this.weapons = weapons;
  }
  // accelerate, break, turnLeft, turnRight, fireForward, fireStarboard, firePort  
}

export class Hull {
  constructor(name, width, height, armours, color, maxModules, gunMounts) {
    this.name = name;
    this.gunMounts = gunMounts;
  }
}

export class Motor {
  constructor(name, size, power, energyUsage) {
    this.name = name; this.size = size; this.power = power; this.energyUsage = energyUsage;
  }
}

export class ShipGun {
  constructor(name, reloadTime, energyUsage, power, armourPiercing, color, speed){
    
  }
}
ShipModule: name, size, energyUsage, power
*/