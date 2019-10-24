// space travel engine.

import {gameObject, travelCanvases} from '../gameData.js'; 

// this is where all happens:
const centerPanel = document.getElementById('centerPanel');

// create a view that shows one element
  // something like paint one element on left side, something on right side, then point that is at point a
  
export function travel(from, to) {
  let travelSpeed = null;
  // check if interstellar or intergalactic travel
    // set travelSpeed according to motor that is used to this kind of travel.
  
}

export function drawTravel(from, where) {
  const canvas = document.getElementById('travelCanvas');
  const ctx = canvas.getContext("2d");
  console.log('drawing');
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.arc(200, 200, 300, 0, 2 * Math.PI);
  ctx.stroke(); 
  ctx.closePath();
  
  ctx.beginPath();
  ctx.strokeStyle = 'yellow';
  ctx.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx.stroke();
}
