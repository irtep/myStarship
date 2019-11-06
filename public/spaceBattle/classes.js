 
// this is for all rect shaped things in space battle.. so for about almost for everything.
// they get from here some stuff that they can be located, regardless of their angle
class AllRects {
  
  // this is needed to check "real position" to get collision detect.
  // calculates and sets corners of rotated angles.
  // this was used as reference: https://stackoverflow.com/questions/41489627/collision-between-two-elements-with-rotating/41513341#41513341
  setCorners(angle) {
    
    function getRotatedTopLeftCornerOfRect(x, y, width, height, angle, rType) {
      //console.log('gRtLCOR ', x, y, width, height, angle);
  
      function sin(x) {
        return Math.sin(x / 180 * Math.PI);
      }

      function cos(x) { 
        return Math.cos(x / 180 * Math.PI);
      }
      
      var center = {
        x: (x + width / 2),
        y: (y + height / 2)
      };
      
      // testBars for radar of ai's need to rotate from x and y
      if (rType === 'testBar') {
       center.x = x; center.y = y;     
      }
      
      var vector = {
        x: (x - center.x),
        y: (y - center.y)
      };

      //console.log('vector: ',vector);
      var rotationMatrix = [[cos(angle), -sin(angle)],[sin(angle), cos(angle)]];

      var rotatedVector = {
        x: vector.x * rotationMatrix[0][0] + vector.y * rotationMatrix[0][1],
        y: vector.x * rotationMatrix[1][0] + vector.y * rotationMatrix[1][1]
      };

      return {
        x: (center.x + rotatedVector.x),
        y: (center.y + rotatedVector.y)
      };
    }

    function getAngleForNextCorner(anc,vectorLength) {
      var alpha = Math.acos(anc/vectorLength)*(180 / Math.PI);
      return 180 - alpha*2;
    }

    function getVectorLength(x, y, width, height){
     var center = {
       x: x + width / 2,
       y: y + height / 2
     };
    
    //console.log('center: ',center);
     var vector = {
       x: (x - center.x),
      y: (y - center.y)
     };
       return Math.sqrt(vector.x*vector.x+vector.y*vector.y);
    }  
    /* this might be handy for non-canvas stuff in some other work so i dont delete it
    function getOffset(el) { console.log('el ', el);
      var _x = 0;
      var _y = 0;
      while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      }
      return {
        top: _y,
        left: _x
      };
    } */

    //console.log('gOs', getOffset(this.htmlElement)); console.log('this ', this);
    
    this.leftTopCorner = getRotatedTopLeftCornerOfRect(this.x, this.y, this.w, this.h, angle, this.rType);

    var vecLength = getVectorLength(this.x, this.y, this.w, this.h);
    //console.log('vecLength: ',vecLength);

    angle = angle+getAngleForNextCorner(this.w/2, vecLength);
    //console.log('angle: ',angle);
    this.rightTopCorner = getRotatedTopLeftCornerOfRect(this.x, this.y, this.w, this.h, angle);

    angle = angle+getAngleForNextCorner(this.h/2, vecLength);
    //console.log('angle: ',angle);
    this.rightBottomCorner = getRotatedTopLeftCornerOfRect(this.x, this.y, this.w, this.h, angle);

    angle = angle+getAngleForNextCorner(this.w/2, vecLength);
    //console.log('angle: ',angle);
    this.leftBottomCorner = getRotatedTopLeftCornerOfRect(this.x, this.y, this.w, this.h, angle);
    
    //console.log('created rect ', this);
  };
  
  // return calculated corners:
  getCorners() {
    
    return [this.leftTopCorner,
      this.rightTopCorner,
      this.rightBottomCorner,
      this.leftBottomCorner];
  };
}

class Starship extends AllRects {
  constructor(name, parts, stats){
    super();
    this.name = name;
    this.parts = parts;
    this.stats = stats;
  }
  // accelerate, break, turnLeft, turnRight, fireForward, fireStarboard, firePort
  
}