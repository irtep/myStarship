// star systems

/*
  {name: 'Sol', 
  desc: 'Birthplace of the human race. Nowadays well populated center of trading. Has 6 dockable ports.',
  security: 'Pretty much safe place. However have some dangerous areas too. Strong police presence.',
  docks: ['Earth Trading Center', 'Luna Station', 'Mars Docks', 'Saturnus Mining Center', 'Jupiter Mining Center', 'Uranus Outpost'],
  map: `Sol system`
  } */
  const sol = new StarSystem(Sol, 'Birthplace of the human race. Nowadays well populated center of trading. Has 6 dockable ports.',
  'Pretty much safe place. However have some dangerous areas too. Strong police presence.',['Earth Trading Center', 'Luna Station', 'Mars Docks', 'Saturnus Mining Center', 'Jupiter Mining Center', 'Uranus Outpost'],
  [  //          name, desc, dR, stations,missions,coords,color,visitable, size
  new Location('Sun', 'Bright nice sun.',
   0, null, 1, 'yellow', false, 50),
  new Location('Mercury', 'Small planet near the sun. Good place to charge your solar power devices if nothing else.',
   2, null, 2, 'brown', true, 10),
  new Location('Venus', 'Hot nice planet. Not much going on here',
  0, null, 3, 'orange', true, 15),
  new Location('Earth', 'Legendary birth place of the human race. Center of the solar system. HQ of the Galatic Police Force is located here.',
  1, [new Station(
  'Earth Trading Center',
  'Center of the Solar System. Major trading hub. As mining is banned in earth, metals and other minerals are always welcome here along some other goods.',
  // missions:
  null,
  // buys:  // name, percentage of buying price of baseValue
  [['common metals', 110],
   ['water', 70]
  ],
  // sells:
  [['water', 150],
  ['military weapons', 100]],
  // illegals:
  ['migrants', 'narcotics', 'slaves']
  )
  ], null, 4, 'blue', true, 15),
  new Location('Mars', 'The red planet.', 0, null, null, [1,2], 'yellow', false, 30),
  new Location('Asteroid belt', 'Lots of asteroids.', 0, null, null, [1,2], 'yellow', false, 30),
  new Location('Jupiter', 'Biggest planet around with some moons.', 0, null, null, [1,2], 'yellow', false, 30),
  new Location('Saturnus', 'Big and beautiful with some moons.', 0, null, null, [1,2], 'yellow', false, 30),
  new Location('Uranus', 'Bright nice sun.', 0, null, null, [1,2], 'yellow', false, 30),
  new Location('Neptunus', 'Bright nice sun.', 0, null, null, [1,2], 'yellow', false, 30),
  ]);
 // name, desc, missions, buys, sells, illegals : stations
// goods: (name, desc, baseValue, typeOfGood)
export class StarSystem {
  constructor(name, desc, security, stations, locations){
    this.name = name;
    this.desc = desc;
    this.security = security;
    this.stations = stations;
    this.locations = locations;
  };
  
}

export class Location {
  constructor(name, desc, dangerRating, stations, coords, color, visitable, size){
    this.name = name;
    this.desc = desc;
    this.dangerRating = dangerRating,
    this.stations = stations;
    this.missions;
    this.coords = coords;
  }
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
}

export class Goods {
  constructor(name, desc, baseValue, typeOfGood) {
    this.name = name;
    this.desc = desc;
    this.baseValue = baseValue;
    this.typeOfGood = typeOfGood;
  }
}