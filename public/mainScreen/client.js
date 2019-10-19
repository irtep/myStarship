// imports:
import {systems, starMap, gameObject} from '../gameData.js'; 
import * as consoleScreens from './consoleScreens.js'; 


// if someone hovers over locations or btn element
function hovering(elem) { 
  const hoveredElem = document.getElementById(elem.target.id);
  const descPlace = document.getElementById('descPlace');
  const selectedSystem = systems.filter( syst => syst.name === gameObject.player.systemLocation);
  
  if (hoveredElem !== null) {
    const hoPla = selectedSystem[0].locations.filter( loca => loca.name === hoveredElem.id);
    
    if (hoPla[0] !== undefined) {
      let travelInfo = 'Click for more info or to launch a voyage here.';
      
      if (hoPla[0].name === gameObject.player.planetLocation) {
        travelInfo = 'You are here.';
      }
      
      descPlace.innerHTML = `<span class= "yellowText">${hoPla[0].name} </span><br><br> ${hoPla[0].desc}<br><br>
      Spacestations: ${hoPla[0].stations.length}<br><br>${travelInfo}`;
    } else {
      
      if (hoveredElem.id === 'leaveSystem') {
          
        descPlace.innerHTML = `Leave the system.`;
      } else {
  
        // here will be added stuff from consoleScreen.js
        if (descPlace !== null) {
          descPlace.innerHTML = 'something else...';   
        }
      }
    }
    // highlight
    hoveredElem.classList.add('highlighted');
  }
}

// when not anymore hovering over planet
function hoveringOut(elem) {
  const hoveredSystem = document.getElementById(elem.target.id);
  
  if (hoveredSystem !== null) {
  
    hoveredSystem.classList.remove('highlighted');  
  }
}

// click of chosen element for locations and btn
function clicked(elem) {
  const centerPanel = document.getElementById('centerPanel');
  let thisPlace = null;
  let goButton = 'You are here at this moment.';

  // find the scanned place from systems file:
  systems.forEach( (syst) => {
    const allPlaces = syst.locationList;
    
    allPlaces.forEach( (place) => {
      
      if (place.name === elem.target.id) { thisPlace = place }
    });
  });
  
  // make go button if ship is not there at the moment:
  if (thisPlace !== null) {

    if (gameObject.player.planetLocation !== thisPlace.name) { 
    
      goButton = `<input type= "button" value= "Start voyage to here" class= "coolBtns">` 
    }  
  }
  console.log('id ', elem.target.id);
  // separator if planet click or console click.. later system clicks to be added...
  switch (elem.target.className[0]) {
    // console buttons clicked:(_c_onsoles)  
    case 'c':
  
      consoleScreens.bottomConsoles.forEach( cBu => {
        
        if (cBu.btnId === elem.target.id) { 
          
          // if map button:
          if (elem.target.id === 'mapNavi') {
            
            // reload map
            window.location = "https://my-starship.glitch.me/main";  
          } else {
           
            // show information
            centerPanel.innerHTML = cBu.structure;
            console.log('cb ele', cBu.btnId, elem.target.id);  
          }
        }
      });
    break;
    
    // planet clicked: (_l_ocations)
    case 'l':
      /*
      left: image, center: desc, right: buttons to travel and back....
      */
      // if leavesystem is clicked:
      if (elem.target.id === 'leaveSystem') {
      
        loadStarMap(); // this would load whole star map with all systems
      } else {
        
        centerPanel.innerHTML = `<div id= "container">
          <div id= "leftySect" class= "sectors">
            <img src= "${thisPlace.image}" class= "picOfPlanet">
          </div>
          <div id= "centerySect" class= "sectors">
              ${thisPlace.name} <br> <br> ${thisPlace.desc}
          </div>
          <div id= "rightySect" class= "sectors">
            ${goButton} <br><br>
            <input type= "button" value= "Back to map" id= "backButton" class= "goBack coolBtns">          
          </div>
        </div>`;
        // listener for Back to Map-button:
        document.getElementById('backButton').addEventListener('click', clicked);
      }
    break;
    
    // go back (_g_oBack)  
    case 'g':
      
      // reload map
      window.location = "https://my-starship.glitch.me/main";
    break;
      
    default: centerPanel.innerHTML = 'not found!';  
  } 
}

// this is the map that shows all star systems
// HOVER IN and HOVER OUT will need updated when this is used as they are now optimized for system map use!
function loadStarMap() {
   
  // show starmap
  document.getElementById('centerPanel').innerHTML = starMap; 
  
  // event listeners:
  const allSystems2 = document.querySelectorAll('.systems2');
  
  allSystems2.forEach( (syst) => {
    
    syst.addEventListener("mouseover", hovering);
    syst.addEventListener("mouseout", hoveringOut);
    syst.addEventListener("click", clicked);
    
    //console.log('sysy', syst.childNodes[0].id, gameObject.player.locationSystem);
    // paint place where player is
    if (syst.childNodes[0].id === gameObject.player.systemLocation) {
      const foundsystem = syst.childNodes[0];
      
      foundsystem.innerHTML += '<span class= "showFromMap"> (you are here) </span>';
    }
  });
  
  // add location to control panel:
  document.getElementById('whereAreYou').innerHTML = gameObject.player.systemLocation;
  
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
  systemMap += `<td class= "locations sysMap" id= "leaveSystem"> Leave System </td></tr></table>`;
  
  document.getElementById('centerPanel').innerHTML = systemMap;
  document.getElementById('descPlace').innerHTML = systemDesc;
  
  // event listeners:
  const allPlanets = document.querySelectorAll('.locations');
  
  allPlanets.forEach( (planet) => {
    
    planet.addEventListener("mouseover", hovering);
    planet.addEventListener("mouseout", hoveringOut);
    planet.addEventListener("click", clicked);
  });
   
  seS.locations.forEach( (planeta) => {
    
    planeta.stations.forEach( (station) => {
      
      // search players location for highlight purpose
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
  const bottomPanel = document.querySelectorAll('.btn');
  
  // at this point should load gameObject from store
  
  //loads the system map, where you are
  loadSystemMap(gameObject.player.systemLocation);
  
  // functions for bottom console buttons:
  bottomPanel.forEach( (btn) => {
    
    btn.addEventListener("mouseover", hovering);
    btn.addEventListener("mouseout", hoveringOut);
    btn.addEventListener("click", clicked);
  });
});