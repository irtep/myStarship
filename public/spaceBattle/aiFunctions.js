
import { getSpeeds, collisionTest } from './battleFunctions.js';
import { RadarWave, AllRects } from '../classes.js';

export function spaceAiActions(ship, opponent) {
  /*
  width= "1200" height= "600">
  */    
  /*
  00 10 20
  01 11 21
  02 12 22
  */
  // zones of cnv:nw ne c sw se
  const zones = [{},{},{},{},{}]
  const centerOfShip = {x: ship.leftTopCorner.x + (ship.w / 2), y: ship.leftTopCorner.y + (ship.h / 2)};
  const distanceToOpponent = distanceCheck(ship, opponent);
  const checkWhereIsOpponent = null;
  
  // check about where the opponent is for checkWhereIsOpponent by coordinates
  
  // make fake shootings from all cannons
  
  // if fake shootings hits, shoot real cannons there
  
}

/* ---------------- */
// Help Functions:
/* ---------------- */

// Distance check
function distanceCheck(fromWhere, toWhere){
  const a = fromWhere.x - toWhere.x // x1 - x2;
  const b = fromWhere.y - toWhere.y // y1 - y2;

  const c = Math.sqrt( a*a + b*b );
  return c;
}  

export function radarWaves(ship, opponent){
  let hit = null;
  // midpoints of walls
  const walls = {left: {x: 0, y: 300}, right: {x: 1200, y: 300}, up: {x: 600, y: 0}, bottom: {x: 600, y: 600}};
  const distances = {
    leftWall: distanceCheck(ship, walls.left),
    rightWall: distanceCheck(ship, walls.right),
    upWall: distanceCheck(ship, walls.up),
    bottomWall: distanceCheck(ship, walls.bottom),
    opponent: distanceCheck(ship, opponent)
  };
  
  // send radar waves:
    // front:
  
  
  /*
    shoot(shooter, x, y, heading, pool){
    const newBullet = new Bullet(this.name, shooter, x, y, heading, this.power, this.shieldPiercing, this.range,
                                this.speed, this.color);
    
    newBullet.setCorners(newBullet.heading);
    pool.push(newBullet);
  }
  
  export class RadarWave extends AllRects{
  constructor(x, y, heading, w, h) {
    super();
    this.x = x; this.y = y; this.heading = heading;
    this.w = w; this.h = h; this.live = true;
  }
  
  destroy() {
    this.live = false;
    this.x = null;
    this.y = null;
  }
}
  */
}