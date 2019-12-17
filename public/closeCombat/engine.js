
import { characters } from '../gameData/characters.js';
import { freezeCopy } from '../helpFunctions.js';
import { setupCharacter } from './battleFunctions.js';

window.onload = ( () => {
  let gameObject = null;
  
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
  let battleArray = team1.team.concat(team2.team);
  
  battleArray.sort( (a, b) => (a.stats.speed < b.stats.speed) ? 1: -1);
  console.log('battleA ', battleArray);
  // make the arena
  
  // deployment. slowest first
  
  // start battle
  
  console.log('teams: ', team1, team2);
  
});