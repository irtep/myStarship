
import { characters } from '../gameData/characters.js';
import { freezeCopy, callDice } from '../helpFunctions.js';
import { setupCharacter, generateObstacle } from './battleFunctions.js';
import { draw } from './draw.js';
  
const canvas = document.getElementById('combatGround');
const ctx = canvas.getContext('2d');
let gameObject = null;
let battleObject = {
  teams: null,
  arena: {obstacles: null}
};

/* on hover listener of canvas elements:
Reference to this: made by Hydroper at https://stackoverflow.com/questions/29300280/update-html5-canvas-rectangle-on-hover
*/
let hover = false;
let id = null;

canvas.onmousemove = (e) => {
  
  // Get the current mouse position
  let r = canvas.getBoundingClientRect(),
      x = e.clientX - r.left, y = e.clientY - r.top;
  hover = false;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for(let i = battleObject.arena.obstacles.length - 1, b; b = battleObject.arena.obstacles[i]; i--) {
        
    // arcs
    if (battleObject.arena.obstacles[i].arc) {
      
    } else { 
      
    // rects  
    if(x >= b.x && x <= b.x + b.w &&
      y >= b.y && y <= b.y + b.h) {
            
      // The mouse honestly hits the rect
      hover = true;
      id = i;
      break;
    }
  }
  }
    // Draw the rectangles by Z (ASC)
    draw(battleObject, canvas, hover, id);
  //console.log('hover, id ', hover, id);
}


/*
];

var hover = false, id;
var _i, _b;
function renderMap() {
    for(_i = 0; _b = map[_i]; _i ++) {
        ctx.fillStyle = (hover && id === _i) ? "red" : "blue";
        ctx.fillRect(_b.x, _b.y, _b.w, _b.h);
    }
}
// Render everything
renderMap();
canvas.onmousemove = function(e) {
    // Get the current mouse position
    var r = canvas.getBoundingClientRect(),
        x = e.clientX - r.left, y = e.clientY - r.top;
    hover = false;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = map.length - 1, b; b = map[i]; i--) {
        if(x >= b.x && x <= b.x + b.w &&
           y >= b.y && y <= b.y + b.h) {
            // The mouse honestly hits the rect
            hover = true;
            id = i;
            break;
        }
    }
    // Draw the rectangles by Z (ASC)
    renderMap();
}
<canvas id="canvas"></canvas>

*/

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
  
  // start battle
  
  console.log('bO: ',battleObject);
  
});