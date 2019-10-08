
export class StarSystem {
  constructor(name, desc, security, stations, locations, locatedAt){
    this.name = name;
    this.desc = desc;
    this.security = security;
    this.stations = stations;
    this.locations = locations;
    this.locatedAt = locatedAt; // 5x5 coords system, for example tingomaria is 11, sol 51
  };
  
  get showName() {
    return this.name;
  }
}

export class Location {
  constructor(name, desc, dangerRating, stations, coords, color, visitable, size){
    this.name = name;
    this.desc = desc;
    this.dangerRating = dangerRating,
    this.stations = stations;
    this.missions;
    this.coords = coords;
    this.color = color;
    this.visitable = visitable;
    this.size = size;
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

