// space travel engine.

import {travelCanvases} from '../gameData.js'; 
  
export function travel(from, to) {
  let travelSpeed = null;
  // check if interstellar or intergalactic travel
    // set travelSpeed according to motor that is used to this kind of travel.
  
}

export function drawTravel(gameObject, systems, newMovementRadar, canvas, ctx, targetX) {
  console.log('nM ', newMovementRadar);
  /*
  
    stationLocation: 'Earth Trading Center',
    planetLocation: 'Earth',
    systemLocation: 'Sol',
    travelStatus: 'docked',
    travelTarget: null,
  */
  
  ctx.clearRect(0,0,canvas.width,canvas.height);  // clear all 
  // from:
  ctx.beginPath();
  ctx.fillStyle = 'yellow';
  ctx.arc(canvas.width / 6, canvas.height / 2, 5, 0, 2 * Math.PI);
  ctx.fill();
  
  // to:
  ctx.beginPath();
  ctx.fillStyle = 'orange';
  ctx.arc(targetX, canvas.height / 2, 5, 0, 2 * Math.PI);
  ctx.fill();
  
  // ship:
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.arc(newMovementRadar.x, newMovementRadar.y, 2, 0, 2 * Math.PI);
  ctx.stroke();
}

export function travelMovement(gameObject, systems) {
  const canvas = document.getElementById('travelCanvas');
  const ctx = canvas.getContext("2d");
  let newMovementRadar = {x: canvas.width / 6, y: canvas.height / 2};
  const systemFrom = systems.filter( syst => syst.name === gameObject.player.systemLocation);
  let insideSystem = true;
  let distance = null;
  let to = null;
  const targetX = 200;
  // check if inside or outside system travel:
  const systemCheck = systems.filter( syst => gameObject.player.travelTarget === syst.name);
  
  if (systemCheck.length === 1) { insideSystem = false; }
  
  // check distance:
  if (insideSystem === true) {
    //check coords of target planet:
    const targetPlanet = systemFrom[0].locations.filter( planet => planet.name === gameObject.player.travelTarget);
    const fromPlanetCoords = systemFrom[0].locations.filter( planet => planet.name === gameObject.player.planetLocation );
    //console.log('fPC', );
    distance = Math.abs(fromPlanetCoords[0].coords - targetPlanet[0].coords);
    console.log(distance);
    // could maybe return distance... for radar screen use...
  }
  
  // make travel round:
  drawTravel(gameObject, systems, newMovementRadar, canvas, ctx, targetX);
  
  const travel = setInterval( () => {
    
    newMovementRadar.x++;
    drawTravel(gameObject, systems, newMovementRadar, canvas, ctx, targetX);
    
    // check if something in scanners
    
    // stop interval if goal is reached:
    if (newMovementRadar.x >= targetX) { 
      
      clearInterval(travel); 
      console.log('reached!');}
      // change location
  }, 500);
  
  for (let i = 0; i < distance; i++ ) {
    
    setTimeout( () => {
      
      newMovementRadar.x++;
      drawTravel(gameObject, systems, newMovementRadar, canvas, ctx);
    }, distance*1000);
  }
}