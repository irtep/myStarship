
// need these for shipGenerator:
import { hulls, motors, shipGuns, shipModules } from './gameData.js';
import { Hull, Motor, ShipGun, ShipModule } from './classes.js';

/*

const testShip = new Starship('TestShip1', 'Zaab 01', 'Vartzila Space 1', [], 
                              {front: 'ValMet S1', star: 'ValMet S1', port: 'ValMet S1'});
*/
/*
                   maxModules,   guns, value, desc  
  new Hull('Zaab 01', 40, 100, {front: 16, sides: 16, back: 11}, 10, {front: 1, starboad: 2, port: 2}, 1000,
          'Reliable classic starship hull.')
*/
export function shipGenerator(ship, startPlace, colors){
  // start places:
  const startPlaces = [[200, 200], [700, 200], [200, 700], [700, 700]];
  // ship placeholder:
  let ship1 = {name: ship.name, x: startPlaces[startPlace][0], y: startPlaces[startPlace][0]};
  
  // ships width and height
  
  // ships speed and energy
  
  // modules... from here atleast shield power, shield regen, autorepair etc....
  
  // colors
  ship1.color1 = colors[0]; ship1.color2 = colors[1];
  
  //set guns stats
  
  // set ships armour
  
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