
const leftSection = document.getElementById('leftSection');
const centerSection = document.getElementById('centerSection');
const rightSection = document.getElementById('rightSection');
import {avatarImages} from '../images/images.js';
import {gameObject, professions} from '../gameData.js';

// update profession, dropdown menu control
function updatePro(newPro) { 
  
  if (newPro.target.value !== 'Choose a profession') {
    
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
  
  // if going back button:
  if (ide.target.value === 'back') {console.log('back button', ide.target.id);
   window.location.reload(false);                                 
  } else {
    
    switch (ide.target.id) {

      case 'newGame':

        leftSection.innerHTML = '<span class= "fa fa-star stars small" style="font-size:7px;">';

        centerSection.innerHTML = `choose your name: <br><input type= "text" id= "charName" max= "25"><br>
          <input type= "button" id= "submitName" value= "submit" class= "but">
          <input type= "button" id= "backfromName" value= "back" class= "but">`;
      break;

      case 'submitName':

        // .replace to remove special chars
        gameObject.player.name = document.getElementById('charName').value.replace(/[\u00A0-\u9999<>\&]/gim, '');
        rightSection.innerHTML = 'name: <span class= "yellowTxt fadingIn">'+ gameObject.player.name+ '</span><br>';
        centerSection.innerHTML = `choose name for your ship: <br><input type= "text" id= "shipName" max= "25"><br>
          <input type= "button" id= "submitShip" value= "submit" class= "but">
           <input type= "button" id= "backfromShip" value= "back" class= "but">`;
      break;    
      case 'submitShip':

        // .replace to remove special chars
        gameObject.player.ship.name = document.getElementById('shipName').value.replace(/[\u00A0-\u9999<>\&]/gim, '');
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
        const changeListener = document.getElementById('selectPro').addEventListener('change', updatePro);
      break;
      case 'submitPro':

        rightSection.innerHTML = `name: <span class= "yellowTxt"> ${gameObject.player.name}</span><br>
  ship: <span class= "yellowTxt"> ${gameObject.player.ship.name}</span><br>
  profession: <span class= "yellowTxt fadingIn">${gameObject.player.profession}`;
        leftSection.innerHTML = '&nbsp; &nbsp; &nbsp; &nbsp; <span class= "fa fa-star stars small" style="font-size:7px;">';
        centerSection.innerHTML = `select avatar: <br>`;
        // make images:
        avatarImages.forEach( (image) => {

          centerSection.innerHTML += `<img src= ${image.url} alt= "avatarImage" class= "avaImage">`;
        });
        // back button:
        centerSection.innerHTML += '<p><input type= "button" id= "backFromAva" value= "back" class= "but"></p>'
      break;

      default: console.log('buttonControl didnt find id.');
    }
  }
      // event listeners:
      const butButtons = document.querySelectorAll('.but');

      butButtons.forEach((btn) => {
        btn.addEventListener('click', buttonControl );
      });
}

// -- ON LOAD ---
window.onload = (() => {
  
  // make new game and load game buttons:
  leftSection.innerHTML = '<input type= "button" id= "newGame" value= "New Game" class= "but"> <br>'+
                          '<input type= "button" id= "loadGame" value= "Load Game" class= "but">';
  // center:
  centerSection.innerHTML = `<span class= "fa fa-star stars small" style="font-size:7px;"></span><p class= "fadingIn intro">
Welcome to the game, captain. <br><br> To start a new adventure, click "new game" from left. 
If you have already started. "load game" is what you are looking for. Good luck!</p>`;
  
  // right:
  rightSection.innerHTML = 'Legendary captains: <br> <span class= "fa fa-star stars small" style="font-size:7px;">';
  
  // event listeners:
  const butButtons = document.querySelectorAll('.but');
  
  butButtons.forEach((btn) => {
    btn.addEventListener('click', buttonControl );
  });
});