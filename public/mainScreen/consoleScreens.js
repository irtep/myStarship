// screens that come when player selects from bottom console some other screen.

export const bottomConsoles = [
{name: 'Map', desc: "Back to map.", structure: `back to map:`, btnId: 'mapNavi'},
  
{name: 'Trade', desc: "Make some trading in station you are at.", structure: `Trade:`, btnId: 'trade'},

{name: 'Cargo', desc: "Check what you have in your cargo bays.", structure: `Cargo:`, btnId: 'cargo'},

{name: 'Marines', desc: "Your marines", structure: `Marines:`, btnId: 'marines'},

{name: 'Missions', desc: "Check done and undone known missions.", structure: `Missions:`, btnId: 'missions'},

{name: 'Ship', desc: "Important information about your ship.", structure: `Ship:`, btnId: 'ship'}
];

export const starMap = `
        <table class= "starMap">
          <center>
          <th class= "whiteText"> Systems on range: </th>
          </center>
          <tr>
            <td class= "systems systems3"></td>
            <td class= "systems systems2" id= "Tingomaria">. <span class= "showFromMap">Tingomaria</span></td>
            <td class= "systems"></td>
            <td class= "systems systems2" id= "Sol">. <span class= "showFromMap">Sol</span>
            </td>
            <td class= "systems"></td>
            <td class= "systems systems2" id= "El Agostin">. <span class= "showFromMap">El Agostin</span></td>
          </tr>
          <tr>
            <td class= "systems"></td>
            <td class= "systems"></td>
            <td class= "systems">.</td>
            <td class= "systems"></td>
            <td class= "systems">.</td>
            <td class= "systems"></td>
          </tr>
          <tr>
            <td class= "systems">.</td>
            <td class= "systems"></td>
            <td class= "systems systems2" id= "Drooklyn">. <span class= "showFromMap">Drooklyn</span></td>
            <td class= "systems"></td>
            <td class= "systems"></td>
            <td class= "systems"></td>
          </tr>
          <tr>
            <td class= "systems"></td>
            <td class= "systems"></td>
            <td class= "systems">.</td>
            <td class= "systems systems2" id= "Safe Haven">. <span class= "showFromMap">Safe Haven</span></td>
            <td class= "systems systems3">.</td>
            <td class= "systems systems2" id= "The Liberty Star">. <span class= "showFromMap">Liberty Star</span></td>
          </tr>
        </table>`;


// canvas for travel:
export const travelCanvases = `<div id= "travelContainer">
<div id= "canvasPlace">
  <canvas id= "travelCanvas"></canvas>
</div>
<div id= "scanner">
  <p id= "scanners">
  Long distance scanner: <span id= "longResults" class= "redText"> nothing</span><br><br>
  Short distance scanner: <span id= "shortResults" class= "redText"> nothing</span><br><br>
  Ship scan results: <span id= "shipScanResults" class= "redText"> n/a</span><br><br>
  Distance to target: <span id= "distanceToTarget" class= "redText"></span>
  <div id= "commands"></div>
  </p>
</div>
</div>`;