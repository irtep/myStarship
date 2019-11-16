/*
  propably lots of experimental stuff first...
*/
import { hulls, motors, shipGuns, shipModules } from '../gameData.js';
import { Starship, AllRects } from '../classes.js';
import { shipGenerator, freezeCopy } from '../helpFunctions.js'; 
import { draw } from './draw.js';
import { getSpeeds, checkKeyPressed, checkKeyReleased, getGunLocation, firingSolutions, collisionTest } from './battleFunctions.js';

const keyDownListeners = window.addEventListener("keydown", checkKeyPressed, false); 
const keyUpListeners = window.addEventListener("keyup", checkKeyReleased, false); 
// place for gameObject
export var gameObject = null;

function shipActions(ship) {
  // need to set max and min speeds....
  
  if (ship.disabled === false) {
    // accelerate
    if (ship.accelerate) { 
      if (ship.power > ship.speed) {ship.speed += 0.1} 
    }
    // break
    if (ship.braking) { 
      if (ship.speed > -1) {ship.speed -= 0.03} 
    }
    // turnLeft
    if (ship.turnLeft) { ship.heading -= 4;}
    // turnRight
    if (ship.turnRight) { ship.heading += 4;}
    
    // fire, star = right, port = left
    if (ship.fireFront) { firingSolutions(ship, ship.frontGuns, 'front', ship.heading); }
    if (ship.fireStar) { firingSolutions(ship, ship.starGuns, 'star', ship.heading + 90); }
    if (ship.firePort) { firingSolutions(ship, ship.portGuns, 'port', ship.heading - 90); }
  }
  
  const speeds = getSpeeds(ship.heading, ship.speed);
  //console.log('speeds', speeds);  
  ship.x += -speeds.x;
  ship.y += speeds.y;
  
  // update x and y for collision test purpose
  ship.setCorners(ship.heading);
  
  const checkCollision = collisionTest(ship, true);
  
  // collision!
  if (checkCollision !== false) { 
    // make collision damages based on masses or something etc.
    // maybe should not move either... gotta think
    //console.log('collision with: ', checkCollision);
  }
}

function bulletActions(bullet) {
  
  for (let i = 0; i < bullet.speed; i++) {
    
    if (bullet.live) {
      // move bullet 1 px
      const speeds = getSpeeds(bullet.heading, 1);
      // add travel
      bullet.travelled++;
    
      bullet.x += -speeds.x;
      bullet.y += speeds.y;
      bullet.setCorners(bullet.heading);
      //console.log(JSON.parse(JSON.stringify(bullet.x)), bullet.y);
      // check collision
      const checkCollision = collisionTest(bullet, false);
    
      // hit!
      if (checkCollision !== false){
        console.log('bullet hit! ', checkCollision.name);
        // make damage
      
        // destroy bullet
        bullet.destroy();
      }
      // if range is full
      if (bullet.travelled >= bullet.range) {bullet.destroy();}
    }
        
  }
}


function animate(){
  
  if (gameObject.battleObject.pause) {
    // game on pause
    
    // draw pause menu, that has atleast option to continue game...
    
  } else {
    
    // ai decisions:
    
    // actions of ships
    gameObject.battleObject.ships.forEach( ship => {
      
      shipActions(ship);
    });
    
    // actions of bullets
    gameObject.battleObject.bullets.forEach( bullet => {
      
      if (bullet.live) {
        bulletActions(bullet);   
      }
    });
    
    // clean dead bullets
    if (gameObject.battleObject.bullets.length > 20) {
      gameObject.battleObject.bullets.shift();
    }
    // draw
    draw(gameObject.battleObject);
  }
  //battleData [this.hitPoints, this.shieldPoints, this.energy, this.refresh];  
  document.getElementById('infoPlace').innerHTML = `hp: ${gameObject.battleObject.ships[0].showBattleData[0]}
 sp: ${gameObject.battleObject.ships[0].showBattleData[1]} e: ${gameObject.battleObject.ships[0].showBattleData[2]}`;
  
    /*  
  `${gameObject.battleObject.ships[0].x} ${gameObject.battleObject.ships[0].y} 
  ${gameObject.battleObject.ships[1].x} ${gameObject.battleObject.ships[1].y}`;
  */
  window.requestAnimationFrame(animate);
}

window.onload = ( () => {
  // load gameObject from store
  gameObject = JSON.parse(localStorage.getItem('Go'));

// test ships:
// this could be at gameObject at players ship place for player 1...
// for ai pilots this would be generated here
const testShip = new Starship('TestShip1', 'Juggernaut', 'Vartzila Space 1', [], 
                              {front: 'ValMet S1', star: 'ValMet S1', port: 'ValMet S1'});
const testShip2 = new Starship('TestShip2', 'Zaab 01', 'Vartzila Space 1', [], 
                              {front: 'ValMet S1', star: 'ValMet S1', port: 'ValMet S1'});

// generate ships by parts. target, startlocation, colors, pilot
const ship1 = shipGenerator(testShip, 0, ['white', 'blue'], gameObject.player.name);
const ship2 = shipGenerator(testShip2, 3, ['red', 'cyan'], 'mister compu');

// make battle object.
const battleObject = {
  ships: [],
  bullets: [],
  //guns: [], // temporal to check gun placings
  pause: false
};
// add ships to battle objects
// first need to be players ship as keyListener works for first ship
battleObject.ships.push(ship1);
battleObject.ships.push(ship2);
  
battleObject.ships.forEach( ship => {
  // update of "corners" for rotation etc.
  ship.setCorners(ship.heading);
  // set timer for energy regen
  setInterval( () => {
    
    if (ship.energy < ship.maxEnergy) {
      ship.energy += ship.power;
      if (ship.energy > ship.maxEnergy) {
        ship.energy = ship.maxEnergy;
      }
    }
  }, 3000);
});

// draw with battle object
//draw(battleObject); 
gameObject.battleObject = battleObject;
console.log('gameObject.battleObject',gameObject.battleObject);
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