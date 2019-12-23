
// need these for shipGenerator:
import { hulls, motors, shipGuns, shipModules } from './gameData/shipData.js';
import { Hull, Motor, ShipGun, ShipModule, ShipInCombat } from './classes.js';

/*
it seems that this is not needed:
// sort double digit numbers:
export function doubleDigsSort(queue){
  
  for (let index = 0; index < queue.length; index++){
    if (queue[index][1] != '.'){
      queue.push(queue.splice(index, 1)[0]);    
    }
  }  
  return queue;
}
*/

// creates a table that can be used to show teams, items etc.
// at the moment this is used at deployment phase
export function listItems(headers, content) {
  let theTable = `<table><tr>`;
  
  //console.log('headers, content ', headers, content);
  // add headers
  for (let i = 0; i < headers.length; i++) {
    theTable += `<th><span class= "redText">${headers[i]}</span></th>`;
  }
  theTable += `</tr>`;
  
  // add content
  for (let i = 0; i < content.length; i++) {
    let theRow = `<tr>`;
    
    // adds i of all content
    
    //could be: name, stats, armour, weapons
    theRow += `<td>${content[i].name} the ${content[i].race}<br>
    <span class= "whiteText">${content[i].rank} ${content[i].profession}</span></td></tr>`;
    // if need second data:
    /*
    theRow += `<td>${content[i].teamNbr}</td></tr>`;
    */
    // add to table
    theTable += theRow;
  }
  
  // finalize table:
  theTable += `</table><br>`
  
  return theTable;
}
// copy variable as it was at the moment
export function freezeCopy(target){
  return JSON.parse(JSON.stringify(target));
}

// prepares ship for combat
export function shipGenerator(ship, startPlace, colors){
  // find parts:
  const parts = {
    hull : hulls.filter( hull => hull.name === ship.hull),
    motor : motors.filter( motor => motor.name === ship.motor),
    frontGuns : shipGuns.filter( gun => gun.name === ship.weapons.front ),
    starGuns: shipGuns.filter( gun => gun.name === ship.weapons.star ),
    portGuns: shipGuns.filter( gun => gun.name === ship.weapons.port ),
    shipModules: []
  };
  
  // start places: // 4 as i might add multiship combat at some points
  const startPlaces = [[20, 50], [900, 500], [200, 400], [900, 500]];
  // ship placeholder:
  let ship1 = new ShipInCombat(ship.name, startPlaces[startPlace][0], startPlaces[startPlace][1], 
               [], [], []);
  
  // ships width and height
  ship1.w = parts.hull[0].width; ship1.h = parts.hull[0].height;
  // ships speed and energy
  ship1.power = parts.motor[0].power / 10;
  ship1.energy = parts.motor[0].power;
  ship1.maxEnergy = parts.motor[0].power;
  // energy regen rate
  ship1.refresh = parts.motor[0].refresh;
  
  // colors
  ship1.color1 = colors[0]; ship1.color2 = colors[1];
  
  //set guns stats
    // front:
  for (let i = 0; i < parts.hull[0].gunMounts.front; i++ ) {
    
    ship1.frontGuns.push(parts.frontGuns[0]);
  }
    // sides:
  for (let i = 0; i < parts.hull[0].gunMounts.star; i++ ) {
    ship1.starGuns.push(parts.starGuns[0]);
  }
  for (let i = 0; i < parts.hull[0].gunMounts.port; i++ ) {
    ship1.portGuns.push(parts.portGuns[0]);
  }
  
  ship1.frontStatus = 'aquamarine';
  ship1.portStatus = 'aquamarine';
  ship1.starStatus = 'aquamarine';
  
  // set ships armour, hit points, shield points and mass
  ship1.armour = parts.hull[0].armours;
  ship1.hitPoints = parts.hull[0].armours.front + parts.hull[0].armours.sides + parts.hull[0].armours.back;
  ship1.mass = ship1.hitPoints + parts.hull[0].maxModules;
  // if one of modules is shield, then shield points, if not, shieldPoints = 0:
  ship1.shieldPoints = 0;
  
  // add modules:
  ship.modules.forEach( module => { 
    
    parts.shipModules.push(module);
    const foundMod = shipModules.filter( mod => mod.name === module );
    //console.log('fm sm ', foundMod, shipModules)
    if ( foundMod[0].moduleType === 'shield') {
      ship1.shieldPoints = foundMod[0].power;
    }
  });
  
  // ram cooldown or every ram ends the battle:
  ship1.ramCoolDown = false;
  
  // headings and speed
  if (startPlace === 3) {
    // for ai:
    ship1.heading = 180;
  } else { ship1.heading = 0; }
  ship1.speed = 0;
  // not disabled:
  ship1.disabled = false;
  ship1.setCorners(ship1.heading);
  
  return ship1;
}


// calls random dice, for example 6 is 1d6
export function callDice(max){
    const result =  1 + Math.floor(Math.random() * max);
    return result;
}  

// find planet from gameData.js. return all info of it.
export function findPlanet(systems, findThis) {
  let found = null;
    // find the scanned place from systems file:
  systems.forEach( (syst) => {
    const allPlaces = syst.locationList;
    
    allPlaces.forEach( (place) => {
      
      if (place.name === findThis) { found = place; }
    });
  });
  
  return found;
}

// shows planet
export function showPlanet(thisPlace, goButton) {
  const centerPanel = document.getElementById('centerPanel');
        
  centerPanel.innerHTML = `<div id= "container">
    <div id= "leftySect" class= "sectors">
    <img src= "${thisPlace.image}" class= "picOfPlanet"><br>
    <span class= "smallText yellowText">art by: ${thisPlace.artBy}</span>
    </div>
    <div id= "centerySect" class= "sectors">
    ${thisPlace.name} <br> <br> ${thisPlace.desc}
    </div>
    <div id= "rightySect" class= "sectors">
    ${goButton} <br><br>
    <input type= "button" value= "Back to map" id= "backButtonSystem" class= "goBack coolBtns">          
    </div>
    </div>`;
}