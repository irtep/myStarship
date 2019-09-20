
const leftSection = document.getElementById('leftSection');
const centerSection = document.getElementById('centerSection');
const rightSection = document.getElementById('rightSection');

// gameObject that contains all player and planet data.
const gameObject = {
  player: {
    
    name: null,
    profession: null,
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
  {name: 'Police', desc: `Galactic Police Force (GPF) maintains peace and order in sector.
starting police officers get as a starting bonus, police-class cannons and shields to his ship and intresting and dangerous missions from raiding criminal
outposts to patrols to keep trade routes safe.`
   },{name: 'Raiders', desc: `Raiders is an alliance of outlaw captains who make their living by robbing freighters and remote outposts.
They give you an adventurous career that include raid missions and clashes againts Police Force. As an extra help to start new Raider member gets pretty good forward cannon to his ship.`
   },{name: 'Merchant', desc: `If you prefer trading goods over fighting, you should join the Merchants Guild.
Not only because violence sucks and is not an answer, but also being a member of the Merchant Guild gets you better trading deals than just doing it solo.
Merchant guild starting bonus is extended cargo bay and upgraded ship engine, as time is money!`
   },{name: 'Smuggler', desc: `If you think that legal goods won't give you enough profits, as you can make much more money with illegal stuff like slaves, illegal imigrants and narcotics. Then the Smugglers are what you are looking for.
Starting bonus is upgraded engine and basic cloaking device.`
   },
];

// update profession, dropdown menu control
function updatePro(newPro) {
  const desci = professions.filter( pro => pro.name === newPro);
  gameObject.player.profession = newPro;
  leftSection.innerHTML = desci[0].desc;
  centerSection.innerHTML += `<input type= "button" id= "submitPro" value= "submit" class= "but" onclick= "buttonControl(this.id)">
         <input type= "button" id= "backfromPro" value= "back" class= "but" onclick= "buttonControl(this.id)">`;
  /* vasta submitin yhteydessä tämä ja submit nappula siihe vielä.
  rightSection.innerHTML += `name
profession: <span class= "yellowTxt"> ${newPro}</span>`;
  console.log('go', gameObject);
  console.log('d ', desci);
  */
  
}
// button control:
function buttonControl(ide) {
  
  switch (ide) {
    
    case 'newGame':
      
      leftSection.innerHTML = '<span class= "fa fa-star stars small" style="font-size:7px;">';
      
      centerSection.innerHTML = `choose your name: <br><input type= "text" id= "charName" max= "15"><br>
        <input type= "button" id= "submitName" value= "submit" class= "but" onclick= "buttonControl(this.id)">
         <input type= "button" id= "backfromName" value= "back" class= "but" onclick= "buttonControl(this.id)">`;
    break;
    
    case 'submitName':
      
      gameObject.player.name = document.getElementById('charName').value;
      rightSection.innerHTML = 'name: <span class= "yellowTxt fadingIn">'+ gameObject.player.name+ '</span><br>';
      centerSection.innerHTML = `choose name for your ship: <br><input type= "text" id= "shipName" max= "15"><br>
        <input type= "button" id= "submitShip" value= "submit" class= "but" onclick= "buttonControl(this.id)">
         <input type= "button" id= "backfromShip" value= "back" class= "but" onclick= "buttonControl(this.id)">`;
    break;    
    case 'submitShip':
      
      gameObject.player.ship.name = document.getElementById('shipName').value;
      rightSection.innerHTML += 'ship: <span class= "yellowTxt fadingIn">'+ gameObject.player.ship.name+ '</span><br>';
      // dropdown for professions
      centerSection.innerHTML = 'select your profession: <br>' + 
            `<form name= "selectProfession id= "selectProfession> 
              <select id="selectPro" onchange= "updatePro(this.value)">
                <option>Choose a profession</option>
              </select>
            </form>`;
      // complete dropdowns from const:
      professions.forEach( (item) => { 
         const o = document.createElement("option");

         o.text = item.name;
         o.value = item.name;
         document.getElementById("selectPro").appendChild(o);
      });
    break;
    case 'submitPro':
      rightSection.innerHTML = `name: <span class= "yellowTxt"> ${gameObject.player.name}</span>
ship: <span class= "yellowTxt"> ${gameObject.player.ship.name}</span>
profession: <span class= "yellowTxt fadingIn">${gameObject.player.profession}`;
    break;
    default: console.log('buttonControl didnt find id.');
  }
  
  
}

// -- ON LOAD ---
window.onload = (() => {
  
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