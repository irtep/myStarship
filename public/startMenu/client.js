
const leftSection = document.getElementById('leftSection');
const centerSection = document.getElementById('centerSection');
const rightSection = document.getElementById('rightSection');
import avatarImages from '../images/images.js';
console.log('imgs', avatarImages);
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
   },{name: 'Raider', desc: `Raiders is an alliance of outlaw captains who make their living by robbing freighters and remote outposts.
They give you an adventurous career that include raid missions and clashes againts Police Force. As an extra help to start new Raider member gets pretty good forward cannon to his ship.`
   },{name: 'Merchant', desc: `If you prefer trading goods over fighting, you should join the Merchants Guild.
Not only because violence sucks and is not an answer, but also being a member of the Merchant Guild gets you better trading deals than just doing it solo.
Merchant guild starting bonus is extended cargo bay and upgraded ship engine, as time is money!`
   },{name: 'Smuggler', desc: `If you think that legal goods won't give you enough profits, as you can make much more money with illegal stuff like slaves, illegal imigrants and narcotics. Then the Smugglers are what you are looking for.
Starting bonus is upgraded engine and some extra armour to keep a distance to hand of so called justice.`
   },{name: 'Freelancer', desc: `Instead of doing jobs for other people, why not to work for yourself? You will not get any starter bonuses but you are free to do whatever missions you like!`
   }
];

/*
  document.querySelector('.but').addEventListener('click', buttonControl(this.id))
*/

// update profession, dropdown menu control
function updatePro(newPro) { // tulee yhen jälessä.... kokoajan...
  if (newPro.target.value !== 'Choose a profession') {
  console.log(newPro.target.value);
  const desci = professions.filter( pro => pro.name === newPro.target.value);
  const sePro = document.getElementById('selectPro');
  const subButton = document.getElementById('submitPro');
  const backButton = document.getElementById('backFromPro');
  // find out index number to set dropdown menu selection, as it doesnt update correctly:
  //const indexNro = professions.map( (e) => { return e.name }).indexOf(newPro.target.value);
  
  if (gameObject.player.profession === null) { 
    subButton.classList.remove('invis');
    backButton.classList.remove('invis');
  }    
  gameObject.player.profession = newPro.target.value;
  leftSection.innerHTML = '<span class= "bigger"><center>'+ desci[0].name + '</center></span>' + desci[0].desc;
  }
}
// button control:
function buttonControl(ide) {
  
  switch (ide.target.id) {
    
    case 'newGame':
      
      leftSection.innerHTML = '<span class= "fa fa-star stars small" style="font-size:7px;">';
      
      centerSection.innerHTML = `choose your name: <br><input type= "text" id= "charName" max= "15"><br>
        <input type= "button" id= "submitName" value= "submit" class= "but">
        <input type= "button" id= "backfromName" value= "back" class= "but">`;
    break;
    
    case 'submitName':
      
      gameObject.player.name = document.getElementById('charName').value;
      rightSection.innerHTML = 'name: <span class= "yellowTxt fadingIn">'+ gameObject.player.name+ '</span><br>';
      centerSection.innerHTML = `choose name for your ship: <br><input type= "text" id= "shipName" max= "15"><br>
        <input type= "button" id= "submitShip" value= "submit" class= "but">
         <input type= "button" id= "backfromShip" value= "back" class= "but">`;
    break;    
    case 'submitShip':
      
      gameObject.player.ship.name = document.getElementById('shipName').value;
      rightSection.innerHTML += 'ship: <span class= "yellowTxt fadingIn">'+ gameObject.player.ship.name+ '</span><br>';
      // dropdown for professions
      centerSection.innerHTML = `select your profession: <br>
            <select id="selectPro">
                <option value = "Choose a profession">Choose a profession</option>
              </select><br>
         <input type= "button" id= "submitPro" value= "submit" class= "but invis">
         <input type= "button" id= "backFromPro" value= "back" class= "but invis">`;
      // complete dropdowns from const:
      professions.forEach( (item) => { 
         const o = document.createElement("option");

         o.text = item.name;
         o.value = item.name;
         document.getElementById("selectPro").appendChild(o);
      });
      // listener for dropdown:
      const changeListener = document.getElementById('selectPro').addEventListener('click', updatePro);
    break;
    case 'submitPro':
      
      rightSection.innerHTML = `name: <span class= "yellowTxt"> ${gameObject.player.name}</span><br>
ship: <span class= "yellowTxt"> ${gameObject.player.ship.name}</span><br>
profession: <span class= "yellowTxt fadingIn">${gameObject.player.profession}`;
      leftSection.innerHTML = '&nbsp; &nbsp; &nbsp; &nbsp; <span class= "fa fa-star stars small" style="font-size:7px;">';
      centerSection.innerHTML = `select avatar: <br>`;
    break;
    default: console.log('buttonControl didnt find id.');
  }
      // event listeners:
      const butButtons = document.querySelectorAll('.but');

      butButtons.forEach((btn) => {
        btn.addEventListener('click', buttonControl );
      });
}
/*image
var img = document.createElement("img");
img.src = "http://www.google.com/intl/en_com/images/logo_plain.png";

var src = document.getElementById("header");
src.appendChild(img);

*/

// -- ON LOAD ---
window.onload = (() => {
  
  // make new game and load game buttons:
  leftSection.innerHTML = '<input type= "button" id= "newGame" value= "New Game" class= "but"> <br>'+
                          '<input type= "button" id= "loadGame" value= "Load Game" class= "but">';
  // center:
  centerSection.innerHTML = '<span class= "fa fa-star stars small" style="font-size:7px;"></span>';
  
  // right:
  rightSection.innerHTML = 'Legendary captains: <br> <span class= "fa fa-star stars small" style="font-size:7px;">';
  
  // event listeners:
  const butButtons = document.querySelectorAll('.but');
  
  butButtons.forEach((btn) => {
    btn.addEventListener('click', buttonControl );
  });
});