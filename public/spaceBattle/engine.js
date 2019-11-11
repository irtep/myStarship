/*
  propably lots of experimental stuff first...
*/
import { hulls, motors, shipGuns, shipModules } from '../gameData.js';
import { Starship, AllRects } from '../classes.js';
import { shipGenerator } from '../helpFunctions.js'; 
import { draw } from './draw.js';
import { getSpeeds, checkKeyPressed, checkKeyReleased } from './battleFunctions.js';

const keyDownListeners = window.addEventListener("keydown", checkKeyPressed, false); 
const keyUpListeners = window.addEventListener("keyup", checkKeyReleased, false); 
// place for gameObject
export var gameObject = null;

function shipActions(ship) {
  // need to set max and min speeds....
  
if (ship.disabled === false) {
    // accelerate
    if (ship.accelerate) { ship.speed += 0.1 }
    // break
    if (ship.braking) { ship.speed -= 0.03 }
    // turnLeft
    if (ship.turnLeft) { ship.heading -= 4;}
    // turnRight
    if (ship.turnRight) { ship.heading += 4;}
    // fireFront

    // fireStar

    // firePort   
  }
  /*
    carInTurn.angle = carInTurn.statuses.heading;
    carInTurn.setCorners(carInTurn.angle);
  */
  const speeds = getSpeeds(ship.heading, ship.speed);
  //console.log('speeds', speeds);  
  ship.x += -speeds.x;
  ship.y += speeds.y;
  
  // update x and y for collision test purpose
  ship.setCorners(ship.heading);
  /*
    
  car.x += -speeds.x;
  car.y += speeds.y;
  */
}


function animate(){
  
  if (gameObject.battleObject.pause) {
    // game on pause
    
    // draw pause menu, that has atleast option to continue game...
    
  } else {
    
    // ai decisions:
    
    // x and y updates of ships
    gameObject.battleObject.ships.forEach( ship => {
      
      shipActions(ship);
    });
    // x and y updated of bullets
    
    // draw
    draw(gameObject.battleObject);
  }
    
  document.getElementById('infoPlace').innerHTML = `${gameObject.battleObject.ships[0].x} ${gameObject.battleObject.ships[0].y} 
  ${gameObject.battleObject.ships[1].x} ${gameObject.battleObject.ships[1].y}`;
  
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
const ship1 = shipGenerator(testShip, 0, ['white', 'blue'], gameObject.player.name);
const ship2 = shipGenerator(testShip2, 3, ['red', 'cyan'], 'mister compu');

// make battle object.
const battleObject = {
  ships: [],
  bullets: [],
  pause: false
};
// add ships to battle objects
// first need to be players ship as keyListener works for first ship
battleObject.ships.push(ship1);
battleObject.ships.push(ship2);
  
battleObject.ships.forEach( ship => {
  // update of "corners" for rotation etc.
  ship.setCorners(ship.heading);
});

// draw with battle object
//draw(battleObject); 
gameObject.battleObject = battleObject;
animate();  
});

/**
 * Provides requestAnimationFrame in a cross browser way.
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */
if ( !window.requestAnimationFrame ) {

    window.requestAnimationFrame = ( function() {

        return window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
            window.setTimeout( callback, 1000 / 60 );
        };
    }());
}
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