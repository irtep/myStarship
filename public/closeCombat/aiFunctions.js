import { collisionDetect } from './battleFunctions.js';
import { callDice } from '../helpFunctions.js';
import { canvas } from './engine.js';

export function aiDeploys(team, battleObject) {
  console.log('ai functions: deploy ');
  // random if deploying from left or right
  const leftOrRight = callDice(2); // 1 left, 2 right
  let tryDir = -50;
  let startPlace = {x: canvas.width - 50, y: canvas.height - 50};
  
  if (leftOrRight === 2) { startPlace.x = 50; tryDir = 50}
  
  team.forEach( (warrior, indx) => {
    console.log('deploying: ', warrior);
    const testWarrior = {x: startPlace.x, y: startPlace.y, stats: {size: warrior.stats.size}}
    
    // check from side if collisions
    const checkResults = collisionDetect(testWarrior, battleObject);
    
    // do until warrior has x
    /*  THIS BREAKS THIS NOW... Need to investigate and fix...
    for (let i = 0; warrior.x !== NaN || i >= 100; testWarrior.x += tryDir) {
      
      // if collision try bit to other side until no collision
      if (checkResults.obsOrWarriorCol === false) {
        warrior.x = testWarrior.x;
        warrior.y = testWarrior.y;
      }
      
      // if for some reason couldn't assign x and y... lets try again adding some y.
      if (testWarrior.x < 50) { testWarrior.y += 40; tryDir = 50;}
      if (testWarrior.x > canvas.width - 40) { testWarrior.y += 40; tryDir = -50}
      
      // i is a backup loop breaker, just in case if i just created loop that continues.
      i++;
      if (i > 99) { console.log('i reached 100');}
    }
    */
    // try bit up if no collisions there
  });
}