//import { Character, Armour, Weapon, Race, Guild } from '../classes.js';
import { characters, armours, weapons, races, professions } from '../gameData.js';
import { freezeCopy } from '../helpFunctions.js';
import { setupCharacter } from './battleFunctions.js';

console.log('chars ', characters);
window.onload = ( () => {
  let gameObject = null;
  
  // load gameObject from storage and add it to gameObject
  // however now at test version i make here test teams
  
  const team1 = {
    player: true,
    team: [ setupCharacter(characters[0]), setupCharacter(characters[1])]
  };
  const team2 = {
    player: false,
    team: [ setupCharacter(characters[2])]
  };
  
  // give stats, x and y to characters, attacks
  // will come from setupCharacter function
  
  // make array that has both teams and sort it by speed order
  
  // make the arena
  
  // deployment. slowest first
  
  // start battle
  
  console.log('teams: ', team1, team2);
  
});