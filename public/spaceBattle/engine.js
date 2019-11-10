/*
  propably lots of experimental stuff first...
*/
import { hulls, motors, shipGuns, shipModules } from '../gameData.js';
import { Starship } from '../classes.js';
import { shipGenerator } from '../helpFunctions.js'; 
import { draw } from './draw.js';

// place for gameObject
let gameObject = null;

function shipActions(battleObject) {
  
  battleObject.ships.forEach( (ship) => {
    
    if (ship.disabled === false) {
        
      // accelerate
      
      // break

      // turnLeft

      // turnRight

      // fireFront

      // fireStar

      // firePort   
    }
  });
  
}


function animate(battleObject){
  
  if (battleObject.pause) {
    // game on pause
    
    // draw pause menu, that has atleast option to continue game...
    
  } else {
    
    // ai decisions:
    
    // x and y updates of ships
    
    // x and y updated of bullets
    
    // draw
    draw(battleObject);
  }

  window.requestAnimationFrame(animate);
}

window.onload = ( () => {
  // load gameObject from store
  gameObject = JSON.parse(localStorage.getItem('Go'));

// test ships:
// this could be at gameObject at players ship place for player 1...
// for ai pilots this would be generated here
const testShip = new Starship('TestShip1', 'Zaab 01', 'Vartzila Space 1', [], 
                              {front: 'ValMet S1', star: 'ValMet S1', port: 'ValMet S1'});
const testShip2 = new Starship('TestShip2', 'Zaab 01', 'Vartzila Space 1', [], 
                              {front: 'ValMet S1', star: 'ValMet S1', port: 'ValMet S1'});

// generate ships by parts:
const ship1 = shipGenerator(testShip, 0, ['white', 'blue']);
const ship2 = shipGenerator(testShip2, 3, ['red', 'cyan']);

// make battle object.
const battleObject = {
  ships: [],
  bullets: [],
  pause: false
};
// add ships to battle objects
battleObject.ships.push(ship1);
battleObject.ships.push(ship2);
  
// draw with battle object
//draw(battleObject);  
animate(battleObject);
});

/*

export class Starship extends AllRects {
  constructor(name, hull, motor, modules, weapons){
    super();
    this.weapons = weapons;
  }
  // accelerate, break, turnLeft, turnRight, fireForward, fireStarboard, firePort  
}

export class Motor {
  constructor(name, size, power, durability) {
    this.name = name; this.size = size; this.power = power; this.energyUsage = energyUsage;
  }
}

export class ShipGun {
  constructor(name, reloadTime, energyUsage, power, armourPiercing, color, speed){
    
  }
}
ShipModule: name, size, energyUsage, power
*/

/*
Note: When you call fill(), any open shapes are closed automatically, 
so you don't have to call closePath(). This is not the case when you call stroke().
*/