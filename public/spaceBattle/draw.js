import { freezeCopy } from '../helpFunctions.js';

function clearCanvas(canvas, ctx){
  ctx.clearRect(0,0,canvas.width,canvas.height);  // clear all 
}

export function draw(battleObject) {
  const canvas = document.getElementById('space');
  const ctx = canvas.getContext("2d");
  //console.log('bo ', battleObject)
  // clear canvas
  clearCanvas(canvas, ctx);
  
  // draw ships:
  battleObject.ships.forEach( ship => {
    //console.log('ship: ', ship.color1, ship.x, ship.y, ship.w, ship.h, ship.name);
    // paint hull of the ship:
    ctx.beginPath();
    ctx.fillStyle = ship.color1; 
    ctx.save(); // save coords system
    ctx.translate(ship.leftTopCorner.x, ship.leftTopCorner.y);
    //ctx.translate(ship.x, ship.y);
    ctx.rotate(ship.heading * Math.PI / 180);
    ctx.rect(0, 0, ship.w, ship.h);
    ctx.fill();
    ctx.closePath();
          
    ctx.beginPath();
    ctx.fillStyle = 'white';
      ctx.fillText (ship.name, 0, -10);
      //ctx.fillText (unit.nextCheckPoint, drawPoint.x, drawPoint.y);
      ctx.fill();  
    // other parts then and restore coords.
    ctx.restore();
      /* ships front center
      var midX=ship.rightTopCorner.x+(ship.rightBottomCorner.x-ship.rightTopCorner.x)*0.50;
      var midY=ship.rightTopCorner.y+(ship.rightBottomCorner.y-ship.rightTopCorner.y)*0.50;
      */
      // frontbattery, center
      /*
      ctx.beginPath();
      ctx.strokeStyle = 'white';
      //ctx.arc(ship.x, ship.y, 5, 0, 2 * Math.PI); ctx.arc(ship.leftTopCorner.x, ship.leftTopCorner.y, 5, 0, 2 * Math.PI);
      ctx.arc(midX, midY, 5, 0, 2 * Math.PI);
      ctx.stroke();
        */
      // lines from corners to canvas corners:
      // this is used to see where corners of car are in collision test purpose
      // disabled if game is online.
    /*
      const specialArray = [ship.leftBottomCorner, ship.leftTopCorner, ship.rightBottomCorner, ship.rightTopCorner];
      const specialArray2 = [{x: 0, y: canvas.height},{x: 0, y: 0},{x: canvas.width, y: canvas.height},{x: canvas.width, y: 0}];
      let indicator = 0;
      const drawLines = specialArray.map( (lines) => {
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.moveTo(lines.x, lines.y);
        ctx.lineTo(specialArray2[indicator].x, specialArray2[indicator].y);
        ctx.stroke();
        indicator++;
      });
      */
    
  });
  
  // draw bullets:
  battleObject.bullets.forEach( bullet => {
    if (bullet.live) {
     
      ctx.beginPath();
      /*
      
    ctx.save(); // save coords system
    ctx.translate(bullet.leftTopCorner.x, bullet.leftTopCorner.y);
    ctx.translate(bullet.x, bullet.y);
    ctx.rotate(bullet.heading * Math.PI / 180);
    ctx.rect(0, 0, bullet.w, bullet.h);
    ctx.fill();
    ctx.closePath();
      */
      ctx.fillStyle = bullet.color;
      ctx.rect(bullet.x, bullet.y, 3, 3); // x and y are not there where i want...
      console.log('gunxy', freezeCopy(bullet.x), freezeCopy(bullet.y));
      ctx.fill();
      ctx.closePath();   
     
      /*
      ctx.beginPath();
      ctx.strokeStyle = 'green';
      ctx.arc(bullet.x, bullet.y, 5, 0, 2 * Math.PI);
      ctx.stroke();
      */
    }
  });
  
 // ctx.clearRect(0,0,canvas.width,canvas.height);  // clear all 
  
}

/*

  // paints each car
  race.cars.forEach((unit) => {
    const partsToPaint = unit.pieces;
    const drawPoint = partsToPaint.drawPoint;
    const degrees = unit.statuses.heading;
     
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
    
    // other parts: 
    const paintIt = partsToPaint.parts.map((part) => {
      
      ctx.beginPath();
      ctx.fillStyle = part.color;
      ctx.rect(part.x, part.y, part.w, part.h);
      ctx.fill();
    }); 
      // write drivers name or disabled if no hps
    if (unit.hitPoints < 0.1 && unit.currentLap > 0) {
      
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.fillText ('DISABLED!', drawPoint.x, drawPoint.y);
      ctx.fill; 
    } else {
    
      ctx.beginPath();
      ctx.fillStyle = 'black';
      ctx.fillText (unit.driver, drawPoint.x, drawPoint.y);
      //ctx.fillText (unit.nextCheckPoint, drawPoint.x, drawPoint.y);
      ctx.fill;     
    }
    
    ctx.restore(); // restore coords.
*/

/*
triangle:

    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
*/