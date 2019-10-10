// imports:
import {systems, starMap, gameObject} from '../gameData.js'; 
console.log('sol: ', systems[0]);

function hovering(system) {
  const hoveredSystem = document.getElementById(system.target.id);
  
  hoveredSystem.classList.add('highlighted');
  
  // also add info box to show
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
  const hoveredSystem = document.getElementById(system.target.id);
  
  hoveredSystem.classList.remove('highlighted');
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
  const selectedSystem = systems.filter( syst => syst.name === system);
  const seS = selectedSystem[0];
  const systemDesc = `
  ${seS.name}<br><br>
  ${seS.desc}<br><br>
  security report: ${seS.security}`;
  console.log('sS ', selectedSystem);
  // here so that makes map out of selected system
  let systemMap = `<p class= "whiteText" id= "descPlace">
</p><br><br><table id= "systemMap">
<tr>`;
  
  seS.locations.forEach( (sys) => {
    // add all locations:   
    systemMap += `<td class= "locations" id= "${sys.name}">
     <span style= "color:${sys.color};font-size:${sys.size}"
     class = "sysMap">.</span> ${sys.name}</td>`;     
    
    // here place to check location and paint it in map.
  });
  
  // add end place:
  systemMap += `<td class= "locations sysMap"> Leave System </td></tr></table>`;
  
  document.getElementById('centerPanel').innerHTML = systemMap;
  document.getElementById('descPlace').innerHTML = systemDesc;
  
  // hovering effects and click effects too.
  // event listeners:
  const allPlanets = document.querySelectorAll('.locations');
  
  allPlanets.forEach( (planet) => {
    
    planet.addEventListener("mouseover", hovering);
    planet.addEventListener("mouseout", hoveringOut);
    //console.log('sysy', planet.childNodes[0].id, gameObject.player.locationSystem);
    // paint place where player is
    if (planet.childNodes[0].id === gameObject.player.planetemLocation) {
      const foundplanetem = planet.childNodes[0];
      
      foundplanetem.innerHTML += '<span class= "showFromMap"> (you are here) </span>';
    }
  });
  
}
// -- ON LOAD ---
window.onload = (() => { // // Sol, El Agostin, Tingomaria, Drooklyn, Safe Haven, The Liberty Star

  //loadStarMap(); // this would load whole star map with all systems
  
  //loads system map where you are
  loadSystemMap(gameObject.player.systemLocation);
});