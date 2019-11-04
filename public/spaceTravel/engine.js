// space travel engine.

import { travelCanvases } from '../gameData.js'; 
import { showPlanet, findPlanet } from '../helpFunctions.js';
import { clicked} from '/mainScreen/client.js';
/*
export function travel(from, to) {
  let travelSpeed = null;
  // check if interstellar or intergalactic travel
    // set travelSpeed according to motor that is used to this kind of travel.
  
}
*/
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
  //temporal stats on test purposes before ship is made:
  const enginePower = 10;
  const radarPower = 1;
  
  const canvas = document.getElementById('travelCanvas');
  const ctx = canvas.getContext("2d");
  let newMovementRadar = {x: canvas.width / 6, y: canvas.height / 2};
  const systemFrom = systems.filter( syst => syst.name === gameObject.player.systemLocation);
  let insideSystem = true;
  let distance = null;
  let to = null;
  // this is how many pixels is to goal
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
    // from system to other system:
  } else {
    console.log('far distance');
    distance = 30;
    gameObject.player.systemLocation = 'hyperspace';
  }
  
  
  // make travel round:
  drawTravel(gameObject, systems, newMovementRadar, canvas, ctx, targetX);
  // make station location to null
  
  const travel = setInterval( () => {
    let travelSpeed = enginePower - distance;
    if (travelSpeed <= 0) { travelSpeed = 1}
    // make random check if enemy/friendly ship would need to be added or some other event.
    // events: ship in interception course, neutral ship, space hulk, distress call, mutiny, prison break, tech problem, 
    // problem between crew mates
    
    newMovementRadar.x += travelSpeed;
    drawTravel(gameObject, systems, newMovementRadar, canvas, ctx, targetX);
    
    // stop interval if goal is reached:
    if (newMovementRadar.x >= targetX) { 
      const travelTarget = JSON.parse(JSON.stringify(gameObject.player.travelTarget));
      clearInterval(travel); 
      console.log('reached!');
      // set new location:
      gameObject.player.stationLocation = null;
      gameObject.player.planetLocation = travelTarget;
      gameObject.player.travelStatus = ' high orbit of ';
      // update upper panel:
      document.getElementById('whereAreYou').innerHTML = gameObject.player.travelStatus + gameObject.player.planetLocation;
      
      // check if space ambush
      console.log('inside system: ', insideSystem);
      // check if new system or same system
      if (insideSystem) {
        // load planet info page, set gO.p.planet location, make button to dock
        // voyage to planet button:
        let goButton = 'You are here at this moment.';
        let thisPlace = findPlanet(systems, gameObject.player.travelTarget);
        
        showPlanet(thisPlace, goButton);
        // listener for Back to Map-button and possible travel button:
        document.getElementById('backButtonSystem').addEventListener('click', clicked);
        if (document.getElementById('startTravel') !== null) {
          document.getElementById('startTravel').addEventListener('click', clicked);
        }
        // save gameObject:
        localStorage.setItem('Go', JSON.stringify(gameObject)); 
        console.log('game object: ', gameObject);
      } else {
        // traveled to another system:
        // add target to players location
      }
      
        /*
        */
      }
      // if same system, load planet info page, set gO.p.planet location, make button to dock
      // if different system, load system map, set gO.p.planet to null, set systemlocation to target
    
      // change location
     // gameObject.player.planetLocation = JSON.parse(JSON.stringify(travelTarget));
     
      /*
      
    stationLocation: 'Earth Trading Center',
    planetLocation: 'Earth',
    systemLocation: 'Sol',
    travelStatus: 'docked',
    travelTarget: null,
      */
  }, 500);
}