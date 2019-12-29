
import { characters } from '../gameData/characters.js';
import { freezeCopy, callDice, listItems } from '../helpFunctions.js';
import { setupCharacter, generateObstacle, buttonControl, collisionDetect, canvasClick } from './battleFunctions.js';
import { draw } from './draw.js';
  
const canvas = document.getElementById('combatGround');
const clickCanvas = canvas.addEventListener('click', canvasClick);
const infoGround = document.getElementById('infoGround');
const ctx = canvas.getContext('2d');
let gameObject = null;
export let battleObject = {
  team1: null,
  team2: null,
  teams: null,
  arena: {obstacles: null, // nonDeploys are zones where they cant deploy at start of combat
         nonDeploy2: {x: 0, y: 0, w: canvas.width, h: canvas.height- 150},
         nonDeploy1: {x: 0, y: 150, w: canvas.width, h: canvas.height- 150}
         },
  hoveringIn: {x: null, y: null, stats: {size: 10}}, // has size in weird place as its needed for collision detect.
  phase: null,
  onTurn: null
};
// these for canvas hovers:
let hover = false;
let id = null;

// when mouse moves over the canvas
canvas.onmousemove = (e) => {
  
  // Get the current mouse position
  let r = canvas.getBoundingClientRect();
  let x = e.clientX - r.left; 
  let y = e.clientY - r.top;
  
  // mark them to hoveringIn in battleObject
  battleObject.hoveringIn.x = x;
  battleObject.hoveringIn.y = y;
  
  // collision detect test:
  /* enable only if testing
  const colTest = collisionDetect(battleObject.hoveringIn, battleObject);
  const infoPlace = document.getElementById('infoPlace');
  infoPlace.innerHTML = '';
  if (colTest.nonDeploy1) { infoPlace.innerHTML += 'nonDep1 collision '}
  if (colTest.nonDeploy2) { infoPlace.innerHTML += 'nonDep2 collision '}
  if (colTest.coverObs.length > 0) { infoPlace.innerHTML += 'coverObs collision '}
  if (colTest.solidObs.length > 0) { infoPlace.innerHTML += 'solidObs collision '}
  if (colTest.ownTeam.length > 0) { infoPlace.innerHTML += 'ownteam collision '}
  if (colTest.enemyTeam.length > 0) { infoPlace.innerHTML += 'enemyteam collision'}
  */
  
  hover = false;

  // clear all
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // obstacles
  /*
   should add warriors to this too
  */
  for (let i = battleObject.arena.obstacles.length - 1, b; b = battleObject.arena.obstacles[i]; i--) {
        
    if (battleObject.arena.obstacles[i].arc) {
      
      // arcs
      if(x >= (b.x - b.w/2) && x <= (b.x - b.w/2) + b.w && y >= (b.y - b.h/2) && y <= (b.y - b.h/2) + b.h) {
            
        // hovering
        hover = true;
        id = i;
        break;
      }
      
    } else { 
      
      // rects  
      if(x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h) {
            
        // hovering
        hover = true;
        id = i;
        break;
      }
    }
  }
    
  draw(battleObject, canvas, hover, id);
}

window.onload = ( () => {
  // load gameObject from storage and add it to gameObject
  // however now at test version i make here test teams
  
  const team1 = {
    player: true,
    team: [ setupCharacter(characters[0], 1), setupCharacter(characters[1], 1), setupCharacter(characters[4], 1)]
  };
  const team2 = {
    player: false,
    team: [ setupCharacter(characters[2], 2), setupCharacter(characters[3], 2)]
  };
  
  // add teams to battleObject
  battleObject.team1 = team1;
  battleObject.team2 = team2;
  
  // make array that has both teams and sort it by speed order
  battleObject.teams = team1.team.concat(team2.team).sort( (a, b) => (a.stats.speed < b.stats.speed) ? 1: -1);
  
  // make the arena
  battleObject.arena.obstacles = [];
  
  // how many obstacles 
  const obstaclesAmount = callDice(6) + 2;
  
  // generate obstacles
  for (let i = 0; i < obstaclesAmount; i++) {
    battleObject.arena.obstacles.push(generateObstacle(canvas));
  }
  
  // sort obstacles so that impassables will be drawn last
  battleObject.arena.obstacles.sort( (a, b) => (a.ind > b.ind) ? 1: -1);
  
  // draw canvas
  draw(battleObject, canvas, hover, id);
  
  // deployment. slowest first
    // make a table, showing teams... who has deployment turn is highlighted
  infoGround.innerHTML = '<div class= "teamInfo">' + 
    listItems(['ship 1 team: '], team1.team) + listItems(['ship 2 team: '], team2.team) +
    '<br><center><input type= "button" id= "continueToDepo" value= "Start deployment" class= "gameButton"></center></div>';
  
  // event listener for that created button:
  const contDep = document.getElementById('continueToDepo');
  
  contDep.addEventListener("click", buttonControl);
  // CONTINUE WITH DEPLOYMENT PHASE
  
  // start battle
  
  console.log('bO: ',battleObject);
  
});