// gameObject that contains all player and planet data.
const gameObject = {
  player: {
    
    name: null,
    faction: null,
    stats: null,
    money: 0,
    weapons: null,
    armour: null,
    
    ship: {
      name: null,
      parts: null,
      marines: null}
  }
};
const professions = [
  {name: 'Police', desc: `Galactic Police Force (GPF) maintains peace and order in sector. <br><br>
starting police officers get ship with good firepower to start and intresting and dangerous missions from raiding criminal
outposts to patrols to keep traderoutes safe.`
   }
];

// button control:
function buttonControl(ide) {
  const leftSection = document.getElementById('leftSection');
  const centerSection = document.getElementById('centerSection');
  const rightSection = document.getElementById('rightSection');
  
  switch (ide) {
    
    case 'newGame':
      
      leftSection.innerHTML = '<span class= "fa fa-star stars small" style="font-size:7px;">';
      
      centerSection.innerHTML = 'choose your name: <br><input type= "text" id= "charName" max= "15"><br>'+
        '<input type= "button" id= "submitName" value= "submit" class= "but" onclick= "buttonControl(this.id)">'+
        ' <input type= "button" id= "backfromName" value= "back" class= "but" onclick= "buttonControl(this.id)">';
    break;
    
    case 'submitName':
      
      gameObject.player.name = document.getElementById('charName').value;
      rightSection.innerHTML = 'name: <span class= "yellowTxt">'+ gameObject.player.name+ '</span><br>';
      centerSection.innerHTML = 'choose name for your ship: <br><input type= "text" id= "shipName" max= "15"><br>'+
        '<input type= "button" id= "submitShip" value= "submit" class= "but" onclick= "buttonControl(this.id)">'+
        ' <input type= "button" id= "backfromShip" value= "back" class= "but" onclick= "buttonControl(this.id)">';
    break;    
    case 'submitShip':
      
      gameObject.player.ship.name = document.getElementById('shipName').value;
      rightSection.innerHTML += 'ship: <span class= "yellowTxt">'+ gameObject.player.ship.name+ '</span><br>';
      centerSection.innerHTML = 'select your profession.'
    break;

    default: console.log('buttonControl didnt find id.');
  }
  
  
}

// -- ON LOAD ---
window.onload = (() => {
  const leftSection = document.getElementById('leftSection');
  const centerSection = document.getElementById('centerSection');
  const rightSection = document.getElementById('rightSection');
  
  // make new game and load game buttons:
  leftSection.innerHTML = '<input type= "button" id= "newGame" value= "New Game" class= "but" onclick= "buttonControl(this.id)"> <br>'+
                          '<input type= "button" id= "loadGame" value= "Load Game" class= "but" onclick= "buttonControl(this.id)">';
  // center:
  centerSection.innerHTML = '<span class= "fa fa-star stars small" style="font-size:7px;"></span>';
  
  // right:
  rightSection.innerHTML = 'Legendary captains: <br> <span class= "fa fa-star stars small" style="font-size:7px;">'
 /*
 make dropdowns:
 // Dropdown menu for cars:
vehicles.forEach( (item) => { 
   const o = document.createElement("option");
  
   o.text = item.name;
   o.value = item.name;
   document.getElementById("selectCar").appendChild(o);
});

            Select your car:
            <form name= "selectCarForm" id= "selectCarForm"> 
              <select id="selectCar" onchange= "checkFields()">
                <option>Choose a car</option>
              </select>
            </form>  
 */ 
  
});