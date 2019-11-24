

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
  
  // send radarpulses to all locations..
  
  // if any pulse hits, then say "opponent is there"
  
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