import { armours, weapons } from '../gameData/weapons_armours.js';
import { races, professions } from '../gameData/characters.js';
import { freezeCopy, callDice } from '../helpFunctions.js';
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
    save: null // armour save, smaller the better
    };
  const myProf = professions.filter(  pro => pro.name === character.profession );
  const myRace = races.filter( rac => rac.name === character.race );
  const attacks = {melee: [], ranged: []};
  const myRank = character.rank;
  let myArmour = null;
  
  // if has armour, lets find it from the inventory
  if (character.armour !== null) { myArmour = armours.filter( armo => armo.name === character.armour); }
  
  // give stats
  stats.attacks = myProf[0].stats[myRank].attacks + myRace[0].stats.attacks;
  stats.hitPoints = myProf[0].stats[myRank].con + myRace[0].stats.con;
  stats.speed = myProf[0].stats[myRank].speed + myRace[0].stats.speed;
  stats.str = myProf[0].stats[myRank].str + myRace[0].stats.str;
  stats.def = myProf[0].stats[myRank].def + myRace[0].stats.def;
  stats.bs = myProf[0].stats[myRank].bs;
  stats.ws = myProf[0].stats[myRank].ws;
  stats.con = myProf[0].stats[myRank].con + myRace[0].stats.con;
  
  // get and set armour and its bonuses or "bonuses"
  if (myArmour !== null) {
      
    stats.str += myArmour[0].stats.str;
    stats.speed += myArmour[0].stats.speed;
    stats.con += myArmour[0].stats.con;
    stats.save = myArmour[0].save;    
  }
  
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
  
  // check if has only melee attacks, if so, create unarmed one:
  if (attacks.melee.length === 0) { 
    
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

// generates obstacles to battlefield
// canvas is: width= "1200" height= "600">
// lets try that deployment zones are:
// y: 0 -> canvas.height / 6 and  canvas.height - canvas.height / 6 -> canvas.heigth 
export function generateObstacle(canvas) {
  const minWidth = 20;
  const maxWidth = canvas.width / 4;
  const minHeight = 20;
  const maxHeight = canvas.height / 5;
  let newObstacle = {x: null, y: null, arc: false, w: null, h: null} // if arc is false, then its rect
  
  // check if arc or rect
  
  // randomize width
  
  // randomize height
  
  // randomize x and y
  
  //return
}