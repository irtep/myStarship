/*
  Classes for game.
*/

export class StarSystem {
  constructor(name, desc, security, stations, locations, locatedAt, image, artBy){
    this.name = name;
    this.desc = desc;
    this.security = security;
    this.stations = stations;
    this.locations = locations;
    this.locatedAt = locatedAt; // 5x5 coords system, for example tingomaria is 11, sol 51, doesnt calculate these atm.
    this.image = image;
    this.artBy = artBy;
  };
  
  get showName() {
    return this.name;
  }
  
  get locationList() {
    return this.locations;
  }
}

export class Location {
  constructor(name, desc, dangerRating, stations, coords, color, visitable, size, image, artBy){
    this.name = name;
    this.desc = desc;
    this.dangerRating = dangerRating,
    this.stations = stations;
    this.missions;
    this.coords = coords;
    this.color = color;
    this.visitable = visitable;
    this.size = size;
    this.image = image;
    this.artBy = artBy;
  }
  // should have get atleast...
}

export class Station {
  constructor(name, desc, missions, buys, sells, illegals) {
    this.name = name;
    this.desc = desc;
    this.missions = missions;
    this.buys = buys;
    this.sells = sells;
    this.illegals = illegals;
  }
  // should have get atleast...
}

export class Goods {
  constructor(name, desc, baseValue, typeOfGood) {
    this.name = name;
    this.desc = desc;
    this.baseValue = baseValue;
    this.typeOfGood = typeOfGood;
  }
  // should have get atleast...
}
 
// this is for all rect shaped things in space battle.. so for about almost for everything.
// they get from here some stuff that they can be located, regardless of their angle
export class AllRects {
  
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

export class Starship extends AllRects {
  constructor(name, hull, motor, modules, weapons){
    super();
    this.name = name;
    this.parts = hull;
    this.stats = motor;
    this.modules = modules;
    this.weapons = weapons;
  }
  // accelerate, break, turnLeft, turnRight, fireForward, fireStarboard, firePort  
}

export class Hull {
  constructor(name, width, height, armours, color, maxModules, gunMounts) {
    this.name = name;
    this.width = width;
    this.height = height;
    this.armours = armours;
    this.color = color;
    this.maxModules = maxModules;
    this.gunMounts = gunMounts;
  }
}

export class Motor {
  constructor(name, size, power) {
    this.name = name; this.size = size; this.power = power;
  }
}

export class ShipGun {
  constructor(name, reloadTime, energyUsage, power, armourPiercing, color, speed){
    this.name = name;
    this.reloadTime = reloadTime;
    this.energyUsage = energyUsage;
    this.power = power;
    this.armourPiercing = armourPiercing;
    this.color = color;
    this.speed = speed;
  }
}

export class ShipModule {
  constructor(name, size, energyUsage, power) {
    this.name = name; this.size = size; this.energyUsage = energyUsage, this.power = power;
  }
}