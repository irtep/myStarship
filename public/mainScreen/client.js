// imports:
import {systems} from '../gameData.js';

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
  const starMap = `
        <table class= "starMap">
          <center>
          <th> Systems on range: </th>
          </center>
          <tr>
            <td class= "systems systems3"></td>
            <td class= "systems">.</td>
            <td class= "systems"></td>
            <td class= "systems systems2"><div id= "Sol">.</div></td>
            <td class= "systems"></td>
            <td class= "systems systems2"><div id= "El Agostin">.</div></td>
          </tr>
          <tr>
            <td class= "systems"></td>
            <td class= "systems"></td>
            <td class= "systems systems2"><div id= "Tingomaria">.</div></td>
            <td class= "systems"></td>
            <td class= "systems">.</td>
            <td class= "systems"></td>
          </tr>
          <tr>
            <td class= "systems">.</td>
            <td class= "systems"></td>
            <td class= "systems systems2"><div id= "Drooklyn">.</div></td>
            <td class= "systems"></td>
            <td class= "systems"></td>
            <td class= "systems"></td>
          </tr>
          <tr>
            <td class= "systems"></td>
            <td class= "systems"></td>
            <td class= "systems">.</td>
            <td class= "systems systems2"><div id= "Safe Haven">.</div></td>
            <td class= "systems systems3">.</td>
            <td class= "systems systems2"><div id= "The Liberty Star">.</div></td>
          </tr>
        </table>`;
  
  // show starmap
  document.getElementById('centerPanel').innerHTML = starMap;
  // event listeners:
  const allSystems2 = document.querySelectorAll('.systems2');
  allSystems2.forEach( (syst) => {
    
    syst.addEventListener("mouseover", showDetails);
    syst.addEventListener("mouseout", hideDetails);
  });
});