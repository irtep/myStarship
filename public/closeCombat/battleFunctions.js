import { armours, weapons } from '../gameData/weapons_armours.js';
import { races, professions } from '../gameData/characters.js';
import { freezeCopy, callDice } from '../helpFunctions.js';
import { Weapon } from '../classes.js';
import { battleObject } from './engine.js';

// collision detects
function arcVsArc(sub, obj, subSize, objSize) {
  const dx = sub.x - obj.x;
  const dy = sub.y - obj.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < subSize + objSize) {
    return true;
  } else {
    return false;
  }
}

function arcVsRect(sub, obj) {
  const circle = {x: sub.x ,y: sub.y, r: sub.stats.size};
 
  // return true if the objangle and circle are colliding
  const distX = Math.abs(circle.x - obj.x-obj.w/2);
  const distY = Math.abs(circle.y - obj.y-obj.h/2);

  if (distX > (obj.w/2 + circle.r)) { return false; }
  if (distY > (obj.h/2 + circle.r)) { return false; }

  if (distX <= (obj.w/2)) { return true; } 
  if (distY <= (obj.h/2)) { return true; }

  const dx=distX-obj.w/2;
  const dy=distY-obj.h/2;
  
  return (dx*dx+dy*dy<=(circle.r*circle.r));
}

// main function, process starts from here
export function collisionDetect(who, battleObject, isRect) {
  let collisionSummary = {
    nonDeploy1: false,
    nonDeploy2: false,
    coverObs: [],
    solidObs: [],
    ownTeam: [],
    enemyTeam: []
  }
  
  // vs teams:
  battleObject.teams.forEach( (guy, index) => {
    
    // lets not compare it to itself or if x it is not deployed
    if (who.name !== guy.name && guy.x !== NaN) {
      const collision = arcVsArc(who, guy, who.stats.size, guy.stats.size);
      
      if (collision) {
        // if same team:
        if (who.teamNbr === guy.teamNbr) {
          collisionSummary.ownTeam.push(guy);
        } else {
          collisionSummary.enemyTeam.push(guy);
        }
      }  
    }
  });
  
  // vs obstuctions:
  battleObject.arena.obstacles.forEach( (obs, index) => {
    let collision = null;
    
    if (obs.arc) {
      collision = arcVsArc(who, obs, who.stats.size, obs.w); 
    } else {
      collision = arcVsRect(who, obs);
    }
    
    if (collision) {
        
      if (obs.impassable) {
  
        collisionSummary.solidObs.push(obs);    
      } else {

        collisionSummary.coverObs.push(obs);
      }    
    }
  });
  
  // non-deployment zones
  const nonDep1 = arcVsRect(who, battleObject.arena.nonDeploy1);
  const nonDep2 = arcVsRect(who, battleObject.arena.nonDeploy2);
  
  if (collisionSummary.nonDeploy1) { collisionSummary.nonDeploy1 = true; }
  if (collisionSummary.nonDeploy2) { collisionSummary.nonDeploy2 = true; }
  
  return collisionSummary;
  
  // i leave the references there down below for now, until this is tested:
  /*
   ARC ARC
  var circle1 = {radius: 20, x: 5, y: 5};
var circle2 = {radius: 12, x: 10, y: 5};

var dx = circle1.x - circle2.x;
var dy = circle1.y - circle2.y;
var distance = Math.sqrt(dx * dx + dy * dy);

if (distance < circle1.radius + circle2.radius) {
    // collision detected!
}

  ARC RECT
var circle={x:100,y:290,r:10};
var rect={x:100,y:100,w:40,h:100};

// return true if the rectangle and circle are colliding
function RectCircleColliding(circle,rect){
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    var dx=distX-rect.w/2;
    var dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
}

 RECT RECT
var rect1 = {x: 5, y: 5, width: 50, height: 50}
var rect2 = {x: 20, y: 10, width: 10, height: 10}

if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.y + rect1.height > rect2.y) {
    // collision detected!
}

// filling in the values =>

if (5 < 30 &&
    55 > 20 &&
    5 < 20 &&
    55 > 10) {
    // collision detected!
}
  */
}

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
    save: null, // armour save, smaller the better
    size: null
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
  stats.size = myRace[0].size;
  
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
// canvas is: width= "1000" height= "600">
// lets try that deployment zones are:
// y: 0 -> canvas.height / 6 and  canvas.height - canvas.height / 6 -> canvas.heigth 
export function generateObstacle(canvas) {
  const minWidth = 20;
  const maxWidth = 250;
  const minHeight = 20;
  const maxHeight = 320;
  const minX = 0;
  const maxX = canvas.width;
  const minY = canvas.height / 4;
  const maxY = canvas.height - canvas.height / 4;
  let newObstacle = {x: null, y: null, arc: false, w: null, h: null, impassable: false, ind: 1} // if arc is false, then its rect
  console.log('max x, min y, max y ', maxX, minY, maxY);
  // randomize if arc or rect
  const isArc = callDice(2); if (isArc === 1) { newObstacle.arc = true; }
  
  // check if impassable or just gives cover also, change ind number that will decide drawing order
  const isImpassable = callDice(2); if (isImpassable === 1) { newObstacle.impassable = true; newObstacle.ind = 2}
  
  // randomize width
  let newWidth = callDice(maxWidth);
  
  if (newWidth < minWidth) { newObstacle.w = minWidth; } else { newObstacle.w = newWidth; }
  
  // randomize height
  let newHeight = callDice(maxHeight); 
  
  if (newHeight < minHeight) { newObstacle.h = minHeight; } else { newObstacle.h = newHeight; }
  
  // randomize x and y
  let newX = callDice(maxX);
  let newY = callDice(maxY);
  
  if (newY < minY) { newObstacle.y = minY } else { newObstacle.y = newY }
  
  newObstacle.x = newX;
  
  return newObstacle;
}

export function buttonControl(ide ){
  
  switch (ide.target.id) {
    
    case 'continueToDepo':
      document.getElementById('infoGround').innerHTML = '';
      battleObject.phase = 'deployment';
    break;
      
    default: console.log('id not found in buttonControl'); 
  }
}