import { gameObject } from './engine.js';
import { Starship, AllRects } from '../classes.js';

export function getGunLocation(gunNbr, slots, front, ship) {
  
  if (front) {
    // if only cannon in front. shoot from middle
    if (slots === gunNbr) {
      return {x: ship.x + ship.w, y: ship.y - (ship.h / 2)}
    }
    // 2
    
    // 3
  }
  
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