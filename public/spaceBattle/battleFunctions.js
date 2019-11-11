import { gameObject } from './engine.js';
import { Starship, AllRects } from '../classes.js';

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
      
    default: console.log('not found this key(released) ');  
  }
}