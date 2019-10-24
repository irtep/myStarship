// space travel engine.

import {travelCanvases} from '../gameData.js'; 

// this is where all happens:
const centerPanel = document.getElementById('centerPanel');

// create a view that shows one element
  // something like paint one element on left side, something on right side, then point that is at point a
  
export function travel(from, to) {
  let travelSpeed = null;
  // check if interstellar or intergalactic travel
    // set travelSpeed according to motor that is used to this kind of travel.
  
}

export function moveShip() {
  
  
}

export function drawTravel(gameObject, systems) {
  // CONTINUE FROM HERE!!!
  const canvas = document.getElementById('travelCanvas');
  const ctx = canvas.getContext("2d");
  const systemFrom = systems.filter( syst => syst.name === gameObject.player.systemLocation);
  let insideSystem = true;
  let distance = null;
  let to = null;
  
  // check if inside or outside system travel:
  const systemCheck = systems.filter( syst => gameObject.player.travelTarget === syst.name);
  
  if (systemCheck.length === 1) { insideSystem = false; }
  
  // check distance:
  if (insideSystem === true) {
    //this.place.coords === targetin coordit.
    const fromPlanetCoords = systemFrom[0].locations.filter( planet => planet.name === gameObject.player.planetLocation );
    console.log('fPC', );
    //distance = Math.abs(fromPlanetCoords[0].coords - .coords);
    console.log(distance);
  }
  /*
  
    stationLocation: 'Earth Trading Center',
    planetLocation: 'Earth',
    systemLocation: 'Sol',
    travelStatus: 'docked',
    travelTarget: null,
  */
  
  // from:
  ctx.beginPath();
  ctx.strokeStyle = 'yellow';
  ctx.arc(canvas.width / 6, canvas.height / 2, 5, 0, 2 * Math.PI);
  ctx.stroke();
  
  // to:
  ctx.beginPath();
  ctx.strokeStyle = 'orange';
  ctx.arc(200, canvas.height / 2, 5, 0, 2 * Math.PI);
  ctx.stroke();
  
  // ship:
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.arc(canvas.width / 6, canvas.height / 2, 2, 0, 2 * Math.PI);
  ctx.stroke();
}
