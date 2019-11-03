
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