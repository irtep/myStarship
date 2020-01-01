import { armours, weapons } from '../gameData/weapons_armours.js';
import { races, professions } from '../gameData/characters.js';
import { freezeCopy, callDice } from '../helpFunctions.js';
import { Weapon } from '../classes.js';
import { battleObject } from './engine.js';
import { aiDeploys } from './aiFunctions.js';
import { draw } from './draw.js';
import { canvas } from './engine.js';
const helpBox = document.getElementById('helpBox');
const commands = document.getElementById('commands');
const yourTeam = document.getElementById('yourTeam');
const opponentTeam = document.getElementById('opponentTeam');
const info1 = document.getElementById('info1');

/*
   <div id= "helpBox"></div>
        <div id= "commands"></div>
        <div id= "yourTeam"></div><br><br>
        <div id= "opponentTeam"></div>
         info1
*/

// gives info pack of a warrior
function highlightedInfo(warrior) {
  let weapons = `<br>`;
  let armour = `<br>`;
    
  // adds i of all content
  if (warrior.weapons.length > 0) {
    weapons = '';
    warrior.weapons.forEach( wep => {
      weapons += wep + '<br>';
    })
  } else { weapons = 'unarmed. <br>'}
    
  if (warrior.armour !== null) {
    armour = warrior.armour;
  } else { armour = 'unarmoured. <br>'}
    
  return `${warrior.name} the ${warrior.race} <br>
        ${warrior.rank} ${warrior.profession} <br>
     str: ${warrior.stats.str}   def: ${warrior.stats.def} speed: ${warrior.stats.speed} 
     hit points: ${warrior.stats.hitPoints} <br>
    shooting skill: ${warrior.stats.bs} melee skill: ${warrior.stats.ws} melee attacks: ${warrior.stats.attacks}<br>
  weapons: ${weapons} armour: ${armour} `;
}

// action phase
function actionPhase() {
  console.log('action phase, in turn: ', battleObject.teams[battleObject.onTurn]);
  // add info about action phase
  /*
  helpBox.innerHTML = `turn of: ${battleObject.teams[battleObject.onTurn]}`;
  */
  // refresh teams... or is necessary?
  
  // get information of what team is the warrior in turn
  const checkTeam1 = battleObject.team1.team.filter( warrior => warrior.name === battleObject.teams[battleObject.onTurn]);
  const checkTeam2 = battleObject.team2.team.filter( warrior => warrior.name === battleObject.teams[battleObject.onTurn]);
  
  if (checkTeam1.length === 0) {console.log('player 2 in turn');} else {console.log('player 1 in turn');}
  // if opponents warriors turn, make its action
  
  // if players turn:
  // make buttons: move and attack, run, aim and shoot (if has ranged attack) 
}

// shows info about warriors
function warriorInfo() {
  let helpBoxInfo = null;
  
  if (battleObject.phase === 'deployment') {
    helpBoxInfo = 'Deploy your troops. Highlighed warrior is on turn.';
  }
  
  // some guidance
  helpBox.innerHTML = helpBoxInfo;
     
  // show your team at battle console
  yourTeam.innerHTML = 'Your team: <br>';
  battleObject.team1.team.forEach( (figh, indx) => { 
    let start = '';
    let end = '';
    let info1text = '';
      
    if (indx === battleObject.onTurn && battleObject.phase === 'deployment') { 
      
      start = '<span class= "highLighted">'
      end = '</span>';
      
      // make info of highlighted fighter
      info1.innerHTML = highlightedInfo(figh);
    }
      
    yourTeam.innerHTML += `${start} ${figh.name} ${end}<br>` 
  });
}

// if someone clicks the canvas
export function canvasClick() {
  const colDe = collisionDetect(battleObject.hoveringIn, battleObject);
  // set size
  battleObject.hoveringIn.stats.size = battleObject.team1.team[battleObject.onTurn].stats.size;
  
  switch (battleObject.phase) {
      
  // player deploying
  case 'deployment':
     
    // succesfull deployment place found  
    if (colDe.nonDeploy1 === false && colDe.obsOrWarriorCol === false) {

      battleObject.team1.team[battleObject.onTurn].x = battleObject.hoveringIn.x;
      battleObject.team1.team[battleObject.onTurn].y = battleObject.hoveringIn.y;
      
      // next warrior or next phase
      if (battleObject.onTurn + 1 === battleObject.team1.team.length) {
        
        // ai makes deployment
        aiDeploys(battleObject.team2.team, battleObject);
        
        // draw
        draw(battleObject, canvas, battleObject.hover, battleObject.id)
        
        // next phase
        battleObject.phase = 'fight';
        battleObject.onTurn = 0;
        
        // call action phase:
        actionPhase();
      } else {
        // next warrior
        battleObject.onTurn++;
        //battleObject.hoveringIn.stats.size = battleObject.team1.team[battleObject.onTurn].stats.size;
      }
      
      warriorInfo();
    }
     
    // highlight who is in turn
      // tell player to deploy that guy
    
    // show opponent team at battle console
    
    // if players clicks and if legal deployment deploy the warrior
    
    // if that was last guy, move to next phase, and onTurn to 0
    // and activate ai-deployment.
      // if not, move to next onTurn
  break;    
  // player targets
      
    default: console.log('phase not found: ', battleObject.hoveringIn.x);    
  }
  
}

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
export function collisionDetect(who, battleObject) {
  let collisionSummary = {
    nonDeploy1: false,
    nonDeploy2: false,
    coverObs: [],
    solidObs: [],
    ownTeam: [],
    enemyTeam: [],
    obsOrWarriorCol: false // true if obstruction or warrior collision detected, excluding covers
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
        collisionSummary.obsOrWarriorCol = true;
      }  
    }
  });
  
  // vs obstuctions:
  battleObject.arena.obstacles.forEach( (obs, index) => {
    let collision = null;
    
    if (obs.arc) {                 // /3 as in thats how they are drawn
      collision = arcVsArc(who, obs, who.stats.size, obs.w /3); 
    } else {
      collision = arcVsRect(who, obs);
    }
    
    if (collision) {
        
      if (obs.impassable) {
  
        collisionSummary.solidObs.push(obs);  
        collisionSummary.obsOrWarriorCol = true;  
      } else {

        collisionSummary.coverObs.push(obs);
      }    
    }
  });
  
  // non-deployment zones
  const nonDep1 = arcVsRect(who, battleObject.arena.nonDeploy1);
  const nonDep2 = arcVsRect(who, battleObject.arena.nonDeploy2);
  
  if (nonDep1) { collisionSummary.nonDeploy1 = true; }
  if (nonDep2) { collisionSummary.nonDeploy2 = true; }
  
  return collisionSummary;
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

// executes phase
/* not needed i think
function phases() {
  const commands = document.getElementById('commands');
  const yourTeam = document.getElementById('yourTeam');
  const opponentTeam = document.getElementById('opponentTeam');
  
  switch (battleObject.phase) {
  
    case 'deployment':
      
    break;
      
    default: commands.innerHTML = 'Phase not found!';
  }
}
*/
export function buttonControl(ide ){
  
  switch (ide.target.id) {
    
    case 'continueToDepo':
      document.getElementById('infoGround').innerHTML = '';
      battleObject.phase = 'deployment';
      battleObject.onTurn = 0;
      warriorInfo();
    break;
      
    default: console.log('id not found in buttonControl'); 
  }
}