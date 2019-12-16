import { armours, weapons, races, professions } from '../gameData.js';
import { freezeCopy } from '../helpFunctions.js';
import { Weapon } from '../classes.js';

// setups character for battle
export function setupCharacter(character, teamNbr) {
  const stats = {
    attacks: null,
    hitPoints: null,
    speed: null,
    str: null, // strength
    def: null, // defence
    bs: null, // ballistic skill(shooting)
    ws: null, // weapon skill(melee)
    con: null, // constitution
    save: 6 // armour save, defaults 6, smaller the better
    };
  const myProf = professions.filter(  pro => pro.name === character.profession );
  const myRace = races.filter( rac => rac.name === character.race );
  const attacks = {melee: [], ranged: []};
  const myRank = character.rank;
  
  // give stats
  stats.attacks = myProf[0].stats[myRank].attacks + myRace[0].stats.attacks;
  stats.hitPoints = myProf[0].stats[myRank].con + myRace[0].stats.con;
  stats.speed = myProf[0].stats[myRank].speed + myRace[0].stats.speed;
  stats.str = myProf[0].stats[myRank].str + myRace[0].stats.str;
  stats.def = myProf[0].stats[myRank].def + myRace[0].stats.def;
  stats.bs = myProf[0].stats[myRank].bs;
  stats.ws = myProf[0].stats[myRank].ws;
  stats.con = myProf[0].stats[myRank].con + myRace[0].stats.con;
  
  // get and set armour
  
  // get weapons:
  if (character.weapons.length > 0) {
    
    character.weapons.forEach( wepa => {
      const wielded = weapons.filter( wepo => wepo.name === wepa);
      
      // make attacks
      if (wielded[0].isMeleeWeapon) {
        attacks.melee.push(wielded[0]);  
        // adjust power
        attacks.melee[attacks.melee.length-1].power += stats.str;
      } else {
        attacks.ranged.push(wielded[0]);
      }
    });
  } else {
    
    // if character doesn't have any weapons
    // create unarmed attack:
    const unarmedAttack = new Weapon(myRace[0].unarmed, 0, 0, null, stats.str, 0, 0, 20, true, null, null);
    
    attacks.melee.push(unarmedAttack);
  }
  
  // then special attacks like magic and special technics
  /* not yet made */
  
  // add stats, attacks and team number to character
  character.stats = stats;
  character.attacks = attacks;
  character.teamNbr = teamNbr;
  
  return character;
}