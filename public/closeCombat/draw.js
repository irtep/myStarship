
import { collisionDetect } from './battleFunctions.js';
/*

    for(_i = 0; _b = map[_i]; _i ++) {
        ctx.fillStyle = (hover && id === _i) ? "red" : "blue";
        ctx.fillRect(_b.x, _b.y, _b.w, _b.h);
*/

// hover and id are for hovering effects
// main draw function
export function draw(battleObject, canvas, hover, id) {
  const ctx = canvas.getContext('2d');
  
  // set collision detect of mouse location size and draw size:
  if (battleObject.phase === 'deployment') { battleObject.hoveringIn.stats.size = battleObject.team1.team[battleObject.onTurn].stats.size}
  
  // collision detect of mouse arc
  const colDe = collisionDetect(battleObject.hoveringIn, battleObject);
  
  // clear canvas:
  ctx.clearRect(0,0,canvas.width,canvas.height);  // clear all
  
  // draw obstacles:
  battleObject.arena.obstacles.forEach( (obs) => {
    let ink = 'black';
    let arc = false;
    
    // impassables will be painted black, covers maroon
    if (obs.impassable === false) { ink = 'maroon' }
    
    ctx.beginPath();
    ctx.fillStyle = ink;
    
    if (obs.arc) {
                           // bigger arcs looked bad, so added /3 to size
      ctx.arc(obs.x, obs.y, obs.w / 3, 0, 2 * Math.PI);
    } else {
      
      ctx.rect(obs.x, obs.y, obs.w, obs.h);  
    }
    
    ctx.fill();
    ctx.closePath();
  });
  
  // write info texts if hovered:
  battleObject.arena.obstacles.forEach( (obs, index) => {
      
    if (hover && id === index) {
      
      let writeCoords = {x: null, y: null};
      let fixes = {x: null, y: null}
      
      // set fixes, if near borders, so that info text would still show
      if (obs.x < obs.w / 2) { fixes.x = obs.w / 4} // near left side
      if (obs.x > canvas.width - obs.w && obs.arc === false) { fixes.x = -obs.w; } // near right side
      if (obs.x > canvas.width - obs.w && obs.arc) { fixes.x = -obs.w / 3; } // near top
      if (obs.y > canvas.height - obs.h) { fixes.y = -obs.h /6; } // near bottom
      
      if (obs.arc) {
        writeCoords.x = obs.x + fixes.x;
        writeCoords.y = obs.y + fixes.y;
      } else {
        writeCoords.x = obs.x + obs.w / 2 + fixes.x;
        writeCoords.y = obs.y + obs.h / 2 + fixes.y;
      }
      
      ctx.beginPath();
      ctx.fillStyle = '#49fb35';
      ctx.fillText('hovered', writeCoords.x, writeCoords.y);
      ctx.fill();
      ctx.closePath();
    }
  });
  
  // paint where the mouse goes if needed:
  if (battleObject.phase === 'deployment' && colDe.nonDeploy1 === false && colDe.obsOrWarriorCol === false) {
    
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.arc(battleObject.hoveringIn.x, battleObject.hoveringIn.y, battleObject.hoveringIn.stats.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
  } else {
    
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillText('can not deploy here', battleObject.hoveringIn.x, battleObject.hoveringIn.y);
    ctx.fill();
    ctx.closePath();
  }
  
  // if deployment phase, draw deployment zone lines
  if (battleObject.phase === 'deployment') {
    
    /*team 1 at up*/
    // line
    ctx.beginPath();
    ctx.moveTo(0, 150);
    ctx.lineTo(canvas.width, 150);
    ctx.stroke();
    // text
    ctx.fillStyle = 'green';
    ctx.fillText('team1 deployment zone:', 20, 20);
    ctx.fill();
    ctx.closePath();
    
    /*team 2 at bottom*/
    // line
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 150);
    ctx.lineTo(canvas.width, canvas.height - 150);
    ctx.stroke();
    // text
    ctx.fillStyle = 'blue';
    ctx.fillText('team2 deployment zone:', 20, canvas.height - 180);
    ctx.fill();
    ctx.closePath();
  }
  
  // draw teams
  battleObject.team1.team.forEach( guy => {
    
    // warrior need to have x and y set
    if (guy.x !== NaN) {
    
      ctx.beginPath();
      ctx.fillStyle = 'blue';
      ctx.arc(guy.x, guy.y, guy.stats.size, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
      
      // write text
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.fillText(guy.name, guy.x -10, guy.y -10);
      ctx.fill();
      ctx.closePath();
    }
  });
}