
import { characters } from '../gameData/characters.js';
import { freezeCopy, callDice, listItems } from '../helpFunctions.js';
import { setupCharacter, generateObstacle } from './battleFunctions.js';
import { draw } from './draw.js';
  
const canvas = document.getElementById('combatGround');
const infoGround = document.getElementById('infoGround');
const ctx = canvas.getContext('2d');
let gameObject = null;
let battleObject = {
  teams: null,
  arena: {obstacles: null}
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
  
  hover = false;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
  
  // make array that has both teams and sort it by speed order
  battleObject.teams = team1.team.concat(team2.team);
  
  battleObject.teams.sort( (a, b) => (a.stats.speed < b.stats.speed) ? 1: -1);
  
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
  infoGround.innerHTML = listItems(['fighter: ', 'team: '], battleObject.teams);
    
  // CONTINUE WITH DEPLOYMENT PHASE
  
  // start battle
  
  console.log('bO: ',battleObject);
  
});