import { armours, weapons, races, professions } from '../gameData.js';
import { freezeCopy } from '../helpFunctions.js';
// setups character for battle
export function setupCharacter(character) {
  const stats = {
    attacks: null,
    hitPoints: null,
    speed: null,
    str: null,
    def: null,
    bs: null,
    ws: null
    };
  const myProf = professions.filter(  pro => pro.name === character.profession );
  const myRace = races.filter( rac => rac.name === character.race );
  const attacks = [{melee: [], ranged: []}];
  const myRank = character.rank;
  
  // give stats
  stats.attacks = myProf[0].stats[myRank].attacks + myRace[0].stats.attacks;
  stats.hitPoints = myProf[0].stats[myRank].con + myRace[0].stats.con;
  stats.speed = myProf[0].stats[myRank].speed + myRace[0].stats.speed;
  stats.str = myProf[0].stats[myRank].str + myRace[0].stats.str;
  stats.def = myProf[0].stats[myRank].def + myRace[0].stats.def;
  stats.bs = myProf[0].stats[myRank].bs;
  stats.ws = myProf[0].stats[myRank].ws;
  
  // get weapons:
  character.weapons.forEach( wepa => {
    console.log('wps', weapons); // error here... continue:
    const wielded = weapons.filter(wepo => { wepo.name === wepa.name; console.log('compare: ', wepo, wepa); });
    console.log('wielded: ', freezeCopy(wielded));
    //console.log('comparing ', wepo, wepa);
    if (wielded[0].isMeleeWeapon) {
      attacks.melee.push(wielded[0]);  
      // adjust power
      attacks.melee[attacks.melee.length-1].power += stats.str;
    } else {
      attacks.ranged.push(wielded[0]);
    }
  });
  
  return character;
}