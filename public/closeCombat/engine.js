
import { characters } from '../gameData/characters.js';
import { freezeCopy, callDice } from '../helpFunctions.js';
import { setupCharacter, generateObstacle } from './battleFunctions.js';

window.onload = ( () => {
  const canvas = document.getElementById('combatGround');
  let gameObject = null;
  let battleObject = null;
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
  console.log('battleA ', battleObject);
  
  // make the arena
  battleObject.arena.obstacles = [];
  
  // how many obstacles: 
  const obstaclesAmount = callDice(6) + 2;
  
  for (let i = 0; i < obstaclesAmount; i++) {
    battleObject.arena.obstacles.push(generateObstacle(canvas));
  }
  // deployment. slowest first
  
  // start battle
  
  console.log('teams: ', team1, team2);
  
});