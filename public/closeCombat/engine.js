//import { Character, Armour, Weapon, Race, Guild } from '../classes.js';
import { characters, armours, weapons, races, guilds } from '../gameData.js';
console.log('chars ', characters);
window.onload = ( () => {
  let gameObject = null;
  
  // load gameObject from storage and add it to gameObject
  // however now at test version i make here test teams
  /*
  could be something like that in gameObject the team is something like:
  player(true/false), name, race, rank(like rookie, veteran, elite), armour, weapons,
  class, meleeExp, shootExp, stats: m, s, t, a, ws, bs, d
  constructor(player, name, race, guild, rank, armour, weapons, meleeExp, shootExp, stats, specialAttacks, injury, live)
  */
  const team1 = {
    player: true,
    team: []
  };
  
  
});