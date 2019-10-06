// imports:
import {systems} from '../gameData.js';
import {starMap} from '../gameData.js';
import {sol} from '../gameData.js';
console.log('sol: ', sol);
function showDetails(system) {
  const foundSystem = systems.filter( syst => system.target.id === syst.name);
  
  if (foundSystem.length > 0) {
    const targetSystem = document.getElementById(system.target.id);
    
    targetSystem.innerHTML += `<span class= "showFromMap">name: ${system.target.id}<br>
spacestations: ${foundSystem[0].docks.length}</span>`;
  }
}

function hideDetails(system) {
  
  const targetSystem = document.getElementById(system.target.id);
  
  targetSystem.innerHTML = '.';
}
// -- ON LOAD ---
window.onload = (() => { // // Sol, El Agostin, Tingomaria, Drooklyn, Safe Haven, The Liberty Star
  
  // show starmap
  document.getElementById('centerPanel').innerHTML = starMap;
  // event listeners:
  const allSystems2 = document.querySelectorAll('.systems2');
  allSystems2.forEach( (syst) => {
    
    syst.addEventListener("mouseover", showDetails);
    syst.addEventListener("mouseout", hideDetails);
  });
});