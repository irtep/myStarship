import { gameObject } from './engine.js';
import { Starship, AllRects } from '../classes.js';
    
export function firingSolutions(ship, battery, gLocation) {
      
  for (let i = 0; i < battery.length; i++) {
    const gunLocation = getGunLocation(i+1, battery.length, gLocation, ship);
      
    if (ship.energy >= battery[i].energyUsage && battery[i].coolDown !== true) {
          
      // shoot, deduct energy, set cool down and start counting it down.
      battery[i].shoot(ship.name, gunLocation.x, gunLocation.y, ship.heading, gameObject.battleObject.bullets); 
      ship.energy -= battery[i].energyUsage;
      battery[i].coolDown = true;
      setTimeout( () => { battery[i].coolDown = false }, battery[i].reloadTime*100);
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
    // if only cannon in front. shoot from middle
    if (slots === gunNbr) {    
      const midX = getXY(ship.rightTopCorner.x, ship.rightBottomCorner.x, 0.50).x;
      const midY = getXY(ship.rightTopCorner.y, ship.rightBottomCorner.y, 0.50).y;
      
      return {x: midX, y: midY} } 
    
    // if several cannons in front
    else {
      const multiplier = (1 / (slots + 1)) * gunNbr;
      const gunSlotX = getXY(ship.rightTopCorner.x, ship.rightBottomCorner.x, multiplier).x;
      const gunSlotY = getXY(ship.rightTopCorner.y, ship.rightBottomCorner.y, multiplier).y;
      
      return {x: gunSlotX, y: gunSlotY};
    }
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