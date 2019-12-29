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
    let checkResults = collisionDetect(testWarrior, battleObject);
    
    // look places for deployment
    for (let i = 0;i < 100; i++) {
      
      testWarrior.x += tryDir;
      checkResults = collisionDetect(testWarrior, battleObject);
      if (checkResults.obsOrWarriorCol === false) {i = 101}
    }
    
    warrior.x = testWarrior.x; warrior.y = testWarrior.y;
  });
}