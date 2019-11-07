/*
  propably lots of experimental stuff first...
*/
// place for gameObject
let gameObject = null;

window.onload( () => {
  // load gameObject from store
  gameObject = JSON.parse(localStorage.getItem('Go'));

  
});

/*

class Starship extends AllRects {
  constructor(name, parts, stats){
    super();
    this.name = name;
    this.parts = parts;
    this.stats = stats;
  }
  // accelerate, break, turnLeft, turnRight, fireForward, fireStarboard, firePort
  
*/