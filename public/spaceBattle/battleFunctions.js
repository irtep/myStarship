import { gameObject } from './engine.js';
import { Starship, AllRects } from '../classes.js';
import { callDice } from '../helpFunctions.js';

export function dealDamage(power, armour, modificators) {
  let hitAt = null;
  
  // hits always "to front armor".. i might later add something that ids actual armor that was hit
  // other armours have also values, but they add hit points so they are not completely without use.
  return (power + callDice(12) + modificators) - armour;
}

export function firingSolutions(ship, battery, gLocation, heading) {
  
  for (let i = 0; i < battery.length; i++) {
      
    if (ship.energy >= battery[i].energyUsage && battery[i].coolDown !== true) {
      const gunLocation = getGunLocation(i+1, battery.length, gLocation, ship);
          
      // shoot
      battery[i].shoot(ship.name, gunLocation.x, gunLocation.y, heading, gameObject.battleObject.bullets); 
      // deduct energy
      ship.energy -= battery[i].energyUsage;
      // set cooldown if this was the last shot
      if (i + 1 === battery.length) {
        
        battery[i].coolDown = true;
        // start to count cooldown down
        setTimeout( () => { battery[i].coolDown = false }, battery[i].reloadTime*100);  
      }
      // push gun location to mark it to draw as to test
      /*
      const guns = {x: gunLocation.x, y: gunLocation.y};
      gameObject.battleObject.guns.push(guns);
     */    
    }
  }         
}
// gets x and y from point to another, 1 is full distance
function getXY(from, to, distance) {
  const newX = from + (to - from) * distance;
  const newY = from + (to - from) * distance;
  
  return { x: newX, y: newY };
}

export function getGunLocation(gunNbr, slots, battery, ship) {
  
  if (battery === 'front') {
      const multiplier = (1 / (slots + 1)) * gunNbr; 
    
      const gunSlotX = getXY(ship.rightTopCorner.x, ship.rightBottomCorner.x, multiplier).x;
      const gunSlotY = getXY(ship.rightTopCorner.y, ship.rightBottomCorner.y, multiplier).y;
      
      return {x: gunSlotX, y: gunSlotY};
  } // front battery ends.
  
  if (battery === 'star') { // right
      const multiplier = (1 / (slots + 1)) * gunNbr; 
    
      const gunSlotX = getXY(ship.rightBottomCorner.x, ship.leftBottomCorner.x, multiplier).x;
      const gunSlotY = getXY(ship.rightBottomCorner.y, ship.leftBottomCorner.y, multiplier).y;
      
      return {x: gunSlotX, y: gunSlotY};
  } // front battery ends.
  
  if (battery === 'port') { // left
      const multiplier = (1 / (slots + 1)) * gunNbr; 
    
      const gunSlotX = getXY(ship.leftTopCorner.x, ship.rightTopCorner.x, multiplier).x;
      const gunSlotY = getXY(ship.leftTopCorner.y, ship.rightTopCorner.y, multiplier).y;
      
      return {x: gunSlotX, y: gunSlotY};
  } // front battery ends.
  
}

export function getSpeeds (rotation, speed) { 
  //console.log('rota, speeds', rotation, speed);
  const to_angles = Math.PI/180;
  
  return {
		y: Math.sin(rotation * to_angles) * speed,
		x: Math.cos(rotation * to_angles) * speed * -1,
	};
}

// key Listeners, gameObject.battleObject.ships s car
export function checkKeyPressed(pressed){ 
  // ref: https://keycode.info/
  switch (pressed.code) {
  
    // up  
    case 'ArrowUp': 
      gameObject.battleObject.ships[0].accelerate = true;
    break;
    
      // shift, for alternative acceleration 
    case 'ShiftRight': 
      gameObject.battleObject.ships[0].accelerate = true;
    break;
      
    // down
    case 'ArrowDown': 
      gameObject.battleObject.ships[0].braking = true;
    break;
      
    // left  
    case 'ArrowLeft': 
      gameObject.battleObject.ships[0].turnLeft = true;
    break;
      
    // right  
    case 'ArrowRight': 
      gameObject.battleObject.ships[0].turnRight = true;
    break;
      
    // fire front battery:
    case 'KeyW':
      gameObject.battleObject.ships[0].fireFront = true;
    break;
      
    // fire starboard battery (right):    
    case 'KeyD':
      gameObject.battleObject.ships[0].fireStar = true;
    break;   
      
    // fire port battery (left): 
    case 'KeyA':
      gameObject.battleObject.ships[0].firePort = true;
    break;
      
    default: console.log('not found this key(pressed)');  
  }
}
export function checkKeyReleased(released){
  
  switch (released.code) {
  
    // up  
    case 'ArrowUp': 
      gameObject.battleObject.ships[0].accelerate = false;     
      
    // shift, for alternative acceleration 
    case 'ShiftRight': 
      gameObject.battleObject.ships[0].accelerate = false;
    break;
    break;
    
    // down
    case 'ArrowDown': 
      gameObject.battleObject.ships[0].braking = false;
    break;
      
    // left  
    case 'ArrowLeft': 
      gameObject.battleObject.ships[0].turnLeft = false;
    break;
      
    // right  
    case 'ArrowRight': 
      gameObject.battleObject.ships[0].turnRight = false;
    break;     
      
    // fire front battery:
    case 'KeyW':
      gameObject.battleObject.ships[0].fireFront = false;
    break;
      
    // fire starboard battery (right):    
    case 'KeyD':
      gameObject.battleObject.ships[0].fireStar = false;
    break;   
      
    // fire port battery (left): 
    case 'KeyA':
      gameObject.battleObject.ships[0].firePort = false;
    break;
      
    default: console.log('not found this key(released) ');  
  }
}


/*  
  RECTANGLE BASED COLLISION TEST: 
*/
function pointInPoly(verties, testx, testy) { 
  var i;
  var j;
  var c = 0;
  var nvert = verties.length;
  
  for (i = 0, j = nvert - 1; i < nvert; j = i++) {
  
    if (((verties[i].y > testy) != (verties[j].y > testy)) && (testx < (verties[j].x - verties[i].x) * (testy - verties[i].y) / (verties[j].y - verties[i].y) + verties[i].x))
                    c = !c;
  }
  return c;
}

function testCollision(rectangle) {
  var collision = false;
  //console.log('testC ', rectangle);
  this.getCorners().forEach((corner) => {
    var isCollided = pointInPoly(rectangle.getCorners(), corner.x, corner.y);
                
    if (isCollided) collision = true;
  });
  return collision;
}

// bring "full objects" like car or gameObject.race.track[0].obstacles[0]
// example: checkRectangleCollision(car, gameObject.race.track[0].obstacles[0]);
function checkRectangleCollision(rect, rect2) {
  //console.log('cRC ', rect, rect2);
  if (testCollision.call(rect, rect2)) return true;
  else if (testCollision.call(rect2, rect)) return true;
  return false;
}

// collision test starts here
export function collisionTest(object, isShip) {
  const noCollision = false;
  let compareName = object.name;
  
  // if bullet can't use objects name to check if same
  if (isShip === false) { compareName = object.from };
  // check if collision with ships
  for (let i = 0; i < gameObject.battleObject.ships.length; i++) {
    // lets not compare with same ship.
    if (compareName !== gameObject.battleObject.ships[i].name) {
      
      const testResult = checkRectangleCollision(object, gameObject.battleObject.ships[i]);
      //console.log('test: ', gameObject.battleObject.ships[i]);
      if (testResult) { return gameObject.battleObject.ships[i]; }   
    }  
  }
  
  // if no collisions:
  return noCollision;
}