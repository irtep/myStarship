/*

    for(_i = 0; _b = map[_i]; _i ++) {
        ctx.fillStyle = (hover && id === _i) ? "red" : "blue";
        ctx.fillRect(_b.x, _b.y, _b.w, _b.h);
*/

export function draw(battleObject, canvas, hover, id) {
  const ctx = canvas.getContext('2d');
  
  // clear canvas:
  ctx.clearRect(0,0,canvas.width,canvas.height);  // clear all
  
  // draw obstacles:
  battleObject.arena.obstacles.forEach( (obs) => {
    let ink = 'black';
    let arc = false;
    
    // impassables will be painted black, covers brown
    if (obs.impassable === false) { ink = 'maroon' }
    
    ctx.beginPath();
    ctx.fillStyle = ink;
    
    if (obs.arc) {
                           // bigger arcs looked bad, so added /3 to size
      ctx.arc(obs.x, obs.y, obs.w / 3, 0, 2 * Math.PI);
    } else {
      
      ctx.rect(obs.x, obs.y, obs.w, obs.h);  
    }
    
    ctx.fill();
    ctx.closePath();
  });
  
  // write info texts if hovered:
  battleObject.arena.obstacles.forEach( (obs, index) => {
      
    if (hover && id === index) {
      
      let writeCoords = {x: null, y: null};
      let fixes = {x: null, y: null}
      
      // set fixes, if near borders, so that info text would still show
      if (obs.x < obs.w / 2) { fixes.x = obs.w / 4} // near left side
      if (obs.x > canvas.width - obs.w && obs.arc === false) { fixes.x = -obs.w; } // near right side
      if (obs.x > canvas.width - obs.w && obs.arc) { fixes.x = -obs.w / 3; } // near top
      if (obs.y > canvas.height - obs.h) { fixes.y = -obs.h /6; } // near bottom
      
      if (obs.arc) {
        writeCoords.x = obs.x + fixes.x;
        writeCoords.y = obs.y + fixes.y;
      } else {
        writeCoords.x = obs.x + obs.w / 2 + fixes.x;
        writeCoords.y = obs.y + obs.h / 2 + fixes.y;
      }
      
      ctx.beginPath();
      ctx.fillStyle = '#49fb35';
      ctx.fillText('hovered', writeCoords.x, writeCoords.y);
      ctx.fill;
      ctx.closePath();
    }
  });
  /*
    // paint hull of car
    ctx.beginPath();
    ctx.fillStyle = partsToPaint.hull.color;
    ctx.save(); // save coords system
    if (unit.leftTopCorner !== undefined) {
      ctx.translate(unit.leftTopCorner.x, unit.leftTopCorner.y);}
    else {
      //ctx.translate(partsToPaint.hull.x, partsToPaint.hull.y);} // go here
      ctx.translate(unit.x, unit.y);} // go here
    ctx.rotate(degrees * Math.PI / 180);
    ctx.rect(drawPoint.x, drawPoint.y, partsToPaint.hull.w, partsToPaint.hull.h);// time to paint it
    ctx.fill();
    ctx.closePath();
   
  */
  
}