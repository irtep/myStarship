//import { Character, Armour, Weapon, Race, Guild } from '../classes.js';
import { characters, armours, weapons, races, professions } from '../gameData.js';
import { freezeCopy } from '../helpFunctions.js';

console.log('chars ', characters);
window.onload = ( () => {
  let gameObject = null;
  
  // load gameObject from storage and add it to gameObject
  // however now at test version i make here test teams
  
  const team1 = {
    player: true,
    team: [ characters[0], characters[1]]
  };
  const team2 = {
    player: false,
    team: [ characters[2] ]
  };
  
  // give stats, x and y to characters, attacks
  
  // make array that has both teams and sort it by speed order
  
  // make the arena
  
  // deployment. slowest first
  
  // start battle
  
  console.log('teams: ', team1, team2);
  
});