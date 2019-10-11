// imports:
import {systems, starMap, gameObject} from '../gameData.js'; 

// if someone hovers over system or planet
function hovering(system) {
  const hoveredSystem = document.getElementById(system.target.id);
  
  hoveredSystem.classList.add('highlighted');
}
console.log('show details of sol: ', systems[0].showName);

// when not anymore hovering over system or planet
function hoveringOut(system) {
  const hoveredSystem = document.getElementById(system.target.id);
  
  hoveredSystem.classList.remove('highlighted');
}

// this is the map that shows all star systems
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

// loading system map
function loadSystemMap(system) {
  const selectedSystem = systems.filter( syst => syst.name === system);
  const seS = selectedSystem[0];
  const systemDesc = `
  ${seS.name}<br><br>
  ${seS.desc}<br><br>
  security report: ${seS.security}`;
  
  // here so that makes map out of selected system
  let systemMap = `<p class= "whiteText" id= "descPlace">
</p><br><br><table id= "systemMap">
<tr>`;
  
  seS.locations.forEach( (sys) => {
    // add all locations:   
    systemMap += `<td class= "locations" id= "${sys.name}">
     <span style= "color:${sys.color};font-size:${sys.size}"
     class = "sysMap">.</span> ${sys.name}</td>`;     
  });
  
  // add end place:
  // this need event listener too to be able to be clicked and hover effect
  systemMap += `<td class= "locations sysMap"> Leave System </td></tr></table>`;
  
  document.getElementById('centerPanel').innerHTML = systemMap;
  document.getElementById('descPlace').innerHTML = systemDesc;
  
  // event listeners:
  const allPlanets = document.querySelectorAll('.locations');
  
  allPlanets.forEach( (planet) => {
    
    planet.addEventListener("mouseover", hovering);
    planet.addEventListener("mouseout", hoveringOut);
    /*
    if (planet.locations.id === gameObject.player.stationLocation) {
      const foundplanetem = planet.childNodes[0];
      
      foundplanetem.innerHTML += '<span class= "showFromMap"> (you are here) </span>';
    } */
  });
  
  seS.locations.forEach( (planeta) => {
    
    planeta.stations.forEach( (station) => {
      
      if (station.name === gameObject.player.stationLocation) {
          
        document.getElementById(planeta.name).classList.add('playerHere');    
      }
    });
  });
  
  // upper console update:
  document.getElementById('whereAreYou').innerHTML = `${gameObject.player.stationLocation} in ${gameObject.player.planetLocation}`;
}
// -- ON LOAD ---
window.onload = (() => { // // Sol, El Agostin, Tingomaria, Drooklyn, Safe Haven, The Liberty Star

  //loadStarMap(); // this would load whole star map with all systems
  
  //loads system map where you are
  loadSystemMap(gameObject.player.systemLocation);
});