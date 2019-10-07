// imports:
import {systemsTemporal, systems, starMap, gameObject} from '../gameData.js'; 
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
// -- ON LOAD ---
window.onload = (() => { // // Sol, El Agostin, Tingomaria, Drooklyn, Safe Haven, The Liberty Star

  // add location to control panel:
  document.getElementById('whereAreYou').innerHTML = gameObject.player.stationLocation;
  // show starmap
  document.getElementById('centerPanel').innerHTML = starMap;
  // event listeners:
  const allSystems2 = document.querySelectorAll('.systems2');
  allSystems2.forEach( (syst) => {
    
    syst.addEventListener("mouseover", hovering);
    syst.addEventListener("mouseout", hoveringOut);
    
    // check where is location
    
  });
});