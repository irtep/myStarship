// imports:
import {systems, starMap, gameObject} from '../gameData.js'; 
console.log('sol: ', systems[0]);

function hovering(system) {
  /*
  const foundSystem = systems.filter( syst => system.target.id === syst.name);
  
  if (foundSystem.length > 0) {
    const targetSystem = document.getElementById(system.target.id);
    
    targetSystem.innerHTML += `<span class= "showFromMap">name: ${system.target.id}<br>
spacestations: ${foundSystem[0].docks.length}</span>`;
  }
  */
}
console.log('show details of sol: ', systems[0].showName);

function hoveringOut(system) {
  /*
  const targetSystem = document.getElementById(system.target.id);
  
  targetSystem.innerHTML = '.';
  */
}

function loadStarMap() {
   
  // show starmap
  document.getElementById('centerPanel').innerHTML = starMap; 
  
  // event listeners:
  const allSystems2 = document.querySelectorAll('.systems2');
  
  allSystems2.forEach( (syst) => {
    
    syst.addEventListener("mouseover", hovering);
    syst.addEventListener("mouseout", hoveringOut);
    //console.log('sysy', syst.childNodes[0].id, gameObject.player.locationSystem);
    // paint place where player is
    if (syst.childNodes[0].id === gameObject.player.systemLocation) {
      const foundsystem = syst.childNodes[0];
      
      foundsystem.innerHTML += '<span class= "showFromMap"> (you are here) </span>';
    }
  });
  
  // add location to control panel:
  document.getElementById('whereAreYou').innerHTML = gameObject.player.stationLocation;
  
  // need still clicking effects for travel.
}

function loadSystemMap(system) {
  const selectedSystem = systems.filter( (syst) => {
    syst.name === system
    console.log('looking: ', syst.name, system);
  });
  console.log('look ', );
  console.log('sS ', selectedSystem);
  // here so that makes map out of selected system
  // it goes to 'centerPanel'.innerHTML
  // hovering effects and click effects too.
}
// -- ON LOAD ---
window.onload = (() => { // // Sol, El Agostin, Tingomaria, Drooklyn, Safe Haven, The Liberty Star

  loadStarMap();
  loadSystemMap(gameObject.player.systemLocation);
});