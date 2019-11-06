// space travel engine.

import { travelCanvases } from '../gameData.js'; 
import { showPlanet, findPlanet } from '../helpFunctions.js';
import { clicked, loadSystemMap } from '/mainScreen/client.js';
/*
export function travel(from, to) {
  let travelSpeed = null;
  // check if interstellar or intergalactic travel
    // set travelSpeed according to motor that is used to this kind of travel.
  
}
*/
export function drawTravel(gameObject, systems, newMovementRadar, canvas, ctx, targetX) {
  /* reference of gameObject.player..  
    stationLocation: 'Earth Trading Center',
    planetLocation: 'Earth',
    systemLocation: 'Sol',
    travelStatus: 'docked',
    travelTarget: null,
  */
  /*
  
ctx.font = "30px Arial";
ctx.fillText("Hello World",10,50);
  */
  
  ctx.clearRect(0,0,canvas.width,canvas.height);  // clear all 
  
  // from:
  /*
  ctx.beginPath();
  ctx.strokeStyle = 'green';
  ctx.arc(canvas.width / 6, canvas.height / 2, 5, 0, 2 * Math.PI);
  ctx.stroke();
  */
  // to:
  ctx.beginPath();
  ctx.strokeStyle = 'green';
  ctx.arc(targetX, canvas.height / 2, 5, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = 'white';
  ctx.font = '6px Arial';
  ctx.fillText(gameObject.player.travelTarget, targetX, canvas.height / 2);
  
  //console.log('gameobject', gameOjb);
  // ship:
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.arc(newMovementRadar.x, newMovementRadar.y, 2, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.font = '6px Arial';
  ctx.fillText(gameObject.player.ship.name, newMovementRadar.x, newMovementRadar.y);
}

// TRAVEL STARTS:
export function travelMovement(gameObject, systems) {
  //temporal stats on test purposes before ship is made:
  // enginePower 10 is good, but as testing, speeding it up
  const enginePower = 10;
  const radarPower = 1;
  
  const canvas = document.getElementById('travelCanvas');
  const ctx = canvas.getContext("2d");
  let newMovementRadar = {x: canvas.width / 6, y: canvas.height / 2};
  const systemFrom = systems.filter( syst => syst.name === gameObject.player.systemLocation);
  //console.log('systemFrom: ', JSON.parse(JSON.stringify(systemFrom)));
  let insideSystem = true;
  let distance = null;
  let to = null;
  // this is how many pixels is to goal
  const targetX = 200;
  // check if inside or outside system travel:
  const systemCheck = systems.filter( syst => gameObject.player.travelTarget === syst.name);
  
  if (systemCheck.length === 1) { insideSystem = false; }
  
    // update status:
    gameObject.player.travelStatus = ' cruising at';
  // check distance and add statuses:
  if (insideSystem === true) {
    //check coords of target planet if already at some planet:
    const targetPlanet = systemFrom[0].locations.filter( planet => planet.name === gameObject.player.travelTarget);
    const fromPlanetCoords = systemFrom[0].locations.filter( planet => planet.name === gameObject.player.planetLocation );
    let fromCoords = null;  
    
    // if just came to system sets coords to 14, else planets coords
    if (fromPlanetCoords[0] === undefined) { fromCoords = 14; } else { fromCoords = fromPlanetCoords[0].coords }
    
    distance = Math.abs(fromCoords - targetPlanet[0].coords);  
  } else {
    // from system to other system:
    distance = 30;
    gameObject.player.systemLocation = 'hyperspace';
  }
  
  // show status:
  document.getElementById('whereAreYou').innerHTML = `${gameObject.player.travelStatus} ${gameObject.player.systemLocation}`;
  
  // make travel round:
  drawTravel(gameObject, systems, newMovementRadar, canvas, ctx, targetX);
  // make station location to null
  
  const travel = setInterval( () => {
    let travelSpeed = enginePower - distance;
    
    if (travelSpeed <= 0) { travelSpeed = 1}
    
    // make random check for possible event
    // events: ship in interception course, neutral ship, space hulk, distress call, mutiny, prison break, tech problem, 
    // problem between crew mates, captain challenge, salary problem
    
    newMovementRadar.x += travelSpeed;
    drawTravel(gameObject, systems, newMovementRadar, canvas, ctx, targetX);
    
    // stop interval if goal is reached:
    if (newMovementRadar.x >= targetX) { 
      const travelTarget = JSON.parse(JSON.stringify(gameObject.player.travelTarget));
      clearInterval(travel); 
      // set new location:
      gameObject.player.stationLocation = null;
      gameObject.player.planetLocation = travelTarget;
      gameObject.player.travelStatus = ' high orbit of ';
      // update upper panel:
      document.getElementById('whereAreYou').innerHTML = gameObject.player.travelStatus + gameObject.player.planetLocation;

      // check if space ambush
      
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
      } else {
        // traveled to another system:
        gameObject.player.travelStatus = 'drifting at';
        // station and planet locations to null
        gameObject.player.planetLocation = null; 
        gameObject.player.stationLocation = null;
        // add target to players location of system
        gameObject.player.systemLocation = gameObject.player.travelTarget;
        // show system that is target
        setTimeout( ()=> {
                document.getElementById('whereAreYou').innerHTML = ` <span class= "slowly">${gameObject.player.travelStatus} ${gameObject.player.systemLocation}</span>`;
        }, 100);
        
        loadSystemMap(gameObject.player.systemLocation);
        // save gameObject:
        localStorage.setItem('Go', JSON.stringify(gameObject)); 
        console.log('saved go: ', gameObject);
      }
      
      }
  }, 500);
}