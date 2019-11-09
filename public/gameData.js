/*  gameData of players, opponents, planets etc. */

import { Goods, Station, StarSystem, Location, Starship, Hull, Motor, ShipGun, ShipModule } from '/classes.js';

// gameObject that contains all player and planet data.
export const gameObject = {
  player: {
    
    name: null,
    profession: null,
    stats: null,
    money: 0,
    weapons: null,
    armour: null,
    reputation: null,
    avatar: null,
    psw: null,
    stationLocation: 'Earth Trading Center',
    planetLocation: 'Earth',
    systemLocation: 'Sol',
    travelStatus: 'docked at',
    travelTarget: null,
    
    ship: {
      name: null,
      parts: null,
      marines: null}
  }
};
// player professions:
export const professions = [
  {name: 'Police', desc: `Galactic Police Force (GPF) maintains peace and order in sector.
starting police officers get as a starting bonus, police-class cannons and shields to his ship and intresting and dangerous missions from raiding criminal
outposts to patrols to keep trade routes safe.`
   },{name: 'Raider', desc: `Raiders is an alliance of outlaw captains who make their living by robbing freighters and remote outposts.
They give you an adventurous career that include raid missions and clashes againts Police Force. As an extra help to start new Raider member gets pretty good forward cannon to his ship.`
   },{name: 'Merchant', desc: `If you prefer trading goods over fighting, you should join the Merchants Guild.
Not only because violence sucks and is not an answer, but also being a member of the Merchant Guild gets you better trading deals than just doing it solo.
Merchant guild starting bonus is extended cargo bay and upgraded ship engine, as time is money!`
   },{name: 'Smuggler', desc: `If you think that legal goods won't give you enough profits, as you can make much more money with illegal stuff like slaves, illegal imigrants and narcotics. Then the Smugglers are what you are looking for.
Starting bonus is upgraded engine and some extra armour to keep a distance to hand of so called justice.`
   },{name: 'Freelancer', desc: `Instead of doing jobs for other people, why not to work for yourself? You will not get any starter bonuses but you are free to do whatever missions you like!
Maybe do some intergalactic trading or bounty hunting?`
   }
];

// avatars for players and ai:s
// should maybe need to move to classes... need to think..
export const avatars = [
  {name: 'bigDread', url: 'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2Fdread.png?v=1569043619713', desc: `You are crippled human, but it doesn't matter as you have this powerful exoskeleton,
that makes you way more powerful than most of the creatures around the galaxy.`,
  stats: null,
  race: 'human',
  artBy: 'amorcitos'
  },
  {name: 'Pontitos', url: 'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2FScreenshot%202019-09-26%20at%208.30.56.png?v=1569475960131',
  desc: `You are a proud member of Pontitos folk. Physically they resemble earth dogs, but are about as intelligent as humans.`,
  stats: null,
  race: 'pontito',
  artBy: 'Yuko R'
  }
];

// systems:
// This will be replaced with stuff that uses classes below...
// can be used as a reference to build the worlds
export const systemsTemporal = [ 
  {name: 'Sol', 
  desc: 'Birthplace of the human race. Nowadays well populated center of trading. Has 6 dockable ports.',
  security: 'Mostly safe, however has some dangerous areas.',
  docks: ['Earth Trading Center', 'Luna Station', 'Mars Docks', 'Saturnus Mining Center', 'Jupiter Mining Center', 'Uranus Outpost'],
  map: `Sol system`
  },
  {name: 'El Agostin', 
  desc: 'Dangerous place.',
  security: 'Dangerous.',
  docks: ['outlow1', 'outlow2', 'outlaw3']
  },
  {name: 'Tingomaria', 
  desc: 'safe place, lots of forests. home of "elves"',
  security: 'oke.',
  docks: ['elf1', 'elf2', 'elf3', 'elf4', 'elf5']
  },
  {name: 'Drooklyn', 
  desc: 'Dangerous place.',
  security: 'Dangerous.',
  docks: ['dar1', 'dar2', 'dar3']
  },
  {name: 'Safe Haven', 
  desc: 'robotic place.',
  security: 'okey i guess.',
  docks: ['robt1', 'rob2', 'rob3', 'rob4', 'rob5']
  },
  {name: 'The Liberty Star', 
  desc: 'capitalist place.',
  security: 'oke.',
  docks: ['m1', 'm2', 'm3']}
];

// Map of stars:
/*
<span class= "showFromMap">name: ${system.target.id}<br>
spacestations: ${foundSystem[0].docks.length}</span>`;
*/
export const starMap = `
        <table class= "starMap">
          <center>
          <th class= "whiteText"> Systems on range: </th>
          </center>
          <tr>
            <td class= "systems systems3"></td>
            <td class= "systems systems2" id= "Tingomaria">. <span class= "showFromMap">Tingomaria</span></td>
            <td class= "systems"></td>
            <td class= "systems systems2" id= "Sol">. <span class= "showFromMap">Sol</span>
            </td>
            <td class= "systems"></td>
            <td class= "systems systems2" id= "El Agostin">. <span class= "showFromMap">El Agostin</span></td>
          </tr>
          <tr>
            <td class= "systems"></td>
            <td class= "systems"></td>
            <td class= "systems">.</td>
            <td class= "systems"></td>
            <td class= "systems">.</td>
            <td class= "systems"></td>
          </tr>
          <tr>
            <td class= "systems">.</td>
            <td class= "systems"></td>
            <td class= "systems systems2" id= "Drooklyn">. <span class= "showFromMap">Drooklyn</span></td>
            <td class= "systems"></td>
            <td class= "systems"></td>
            <td class= "systems"></td>
          </tr>
          <tr>
            <td class= "systems"></td>
            <td class= "systems"></td>
            <td class= "systems">.</td>
            <td class= "systems systems2" id= "Safe Haven">. <span class= "showFromMap">Safe Haven</span></td>
            <td class= "systems systems3">.</td>
            <td class= "systems systems2" id= "The Liberty Star">. <span class= "showFromMap">Liberty Star</span></td>
          </tr>
        </table>`;

export const products = [  // name, desc, basePrice, type
  new Goods('common metals', 'metals such as steel, iron, copper etc. usefull for many stuff', 100, 'materials'),
  new Goods('water', 'water is life! and life is precious. There might be huge price differences on this classis good as somewhere there can be plenty of this and somewhere none', 100, 'grocery'),
  new Goods('military weapons', 'including heavy weapons like fighter jets and small deadly items like assault rifles, this item will be hot in very many places!', 300, 'weapons')
];

// Star systems:
// constructor: name, desc, security, stations, locations, locatedAt, image, artBy
export const systems = [
  
  new StarSystem('Sol', 'Birthplace of the human race. Nowadays well populated center of trading. Has 6 dockable ports.',
    'Pretty much safe place. However have some dangerous areas too. Strong police presence.',
    ['Venus Battery Charging ltd.','Earth Trading Center', 'Luna Station', 'Mars Docks', 'Saturnus Mining Center', 'Jupiter Mining Center', 'Uranus Outpost'],
    [  // name, desc, dangerRating, stations, coords, color, visitable, size, image
    new Location('Sun', 'Bright nice sun.',
     0, [], 1, 'yellow', false, 100, null),
    new Location('Mercury', 'Small planet near the sun. Very hot, lots of radiation.',
     2, [], 2, 'brown', true, 10, null),
    new Location('Venus', 'Hot nice planet. Not much going on here, except small battery charging plant',
    2, [], 3, 'orange', true, 15, null),
    new Location('Earth', 'Legendary birth place of the human race. Center of the solar system. HQ of the Galatic Police Force is located here.',
    1, [new Station(
    'Earth Trading Center',
    'Center of the Solar System. Major trading hub. As mining is banned in earth, metals and other minerals are always welcome here along some other goods.',
    // missions:
    null,
    // buys:  // name, percentage of buying price of baseValue
    [
      ['common metals', 110],
      ['water', 70]
    ],
    // sells:
    [
      ['water', 150],
      ['military weapons', 100]],
    // illegals:
    ['migrants', 'narcotics', 'slaves']
    )
    ], 4, 'blue', true, 15, 
    'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2Ftierra.jpg?v=1571323740231',
    'amorcitos'),
    new Location('Mars', 'The red planet.', 2, [], 5, 'red', false, 15, null),
    new Location('Asteroid belt', 'Lots of asteroids.', 4, [], 6, 'gray', false, 3, null),
    new Location('Jupiter', 'Biggest planet around with some moons.', 2, [], 7, 'crimson', false, 40, null),
    new Location('Saturnus', 'Big and beautiful with some moons.', 2, [], 8, 'orange', false, 30, 'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2Fsaturnus.png?v=1572709893543', 'Grace M.'),
    new Location('Uranus', 'Big cold planet.', 3, [], 9, 'blue', false, 30, null),
    new Location('Neptunus', 'Other big cold planet. Good water supply with lots of ice mining on its moons', 3, [], 10, 'gray', false, 30, null),
    new Location('Pluto', 'Small rock in space.', 1,[], 11, 'gray', false, 5, null),
    ],
    // location in starmap:
    51,
    // image:
    'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2Fplanetas2.jpg?v=1572709487593',
    'Grace M.'
    ),  
  
  new StarSystem('Tingomaria', 'Tingomaria has 4 fertile planets, populated by various races.',
    'Can be pretty dangerous place as there are not much police presence.',
    ['station x','station y'],
    [  // name, desc, dangerRating, stations, coords, color, visitable, size, image
    new Location('Sun', 'Bright nice sun.',
     0, [], 1, 'yellow', false, 100, null),
    new Location('planet x', 'Small planet near the sun. Very hot, lots of radiation.',
     2, [], 2, 'brown', true, 10, null),
    new Location('planet y', 'Hot nice planet. Not much going on here, except small battery charging plant',
    2, [], 3, 'orange', true, 15, null),
    new Location('planet z', 'Legendary birth place of the human race. Center of the solar system. HQ of the Galatic Police Force is located here.',
    1, [new Station(
    'station 1',
    'cool place.',
    // missions:
    null,
    // buys:  // name, percentage of buying price of baseValue
    [
      ['common metals', 110],
      ['water', 70]
    ],
    // sells:
    [
      ['water', 150],
      ['military weapons', 100]],
    // illegals:
    ['migrants', 'narcotics', 'slaves']
    )
    ], 4, 'blue', true, 15, 
    'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2Ftierra.jpg?v=1571323740231'),
    new Location('Marx', 'The red planet.', 2, [], 5, 'red', false, 15, null),
    new Location('belt', 'Lots of asteroids.', 4, [], 6, 'gray', false, 3, null),
    new Location('iter', 'Biggest planet around with some moons.', 2, [], 7, 'crimson', false, 40, null),
    new Location('Saus', 'Big and beautiful with some moons.', 2, [], 8, 'orange', false, 30, null),
    new Location('Urus', 'Big cold planet.', 3, [], 9, 'blue', false, 30, null),
    ],
    // location in starmap:
    11,
    // image:
    'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2Ftierra.jpg?v=1571323740231'             
    )
  ];

// canvas for travel:
export const travelCanvases = `<div id= "travelContainer">
<div id= "canvasPlace">
  <canvas id= "travelCanvas"></canvas>
</div>
<div id= "scanner">
  <p id= "scanners">
  Long distance scanner: <span id= "longResults" class= "redText"> nothing</span><br><br>
  Short distance scanner: <span id= "shortResults" class= "redText"> nothing</span><br><br>
  Ship scan results: <span id= "shipScanResults" class= "redText"> n/a</span><br><br>
  Distance to target: <span id= "distanceToTarget" class= "redText"></span>
  <div id= "commands"></div>
  </p>
</div>
</div>`;

/*
   SHIP DATA:
*/

export const hulls = [
  // name, width, height, armours, maxModules, gunMounts, value, desc
  //         name,    w,  h,  armours                            maxModules,   guns, value, desc  
  new Hull('Zaab 01', 8, 20, {front: 16, sides: 16, back: 11}, 10, {front: 1, starboad: 2, port: 2}, 1000,
          'Reliable classic starship hull.')
];
// name, size, power, durability, value, refreshrate, desc
export const motors = [
  new Motor('Vartzila Space 1', 1, 10, 95, 1000, 1, 'Reliable but not very powerful engine.')
];
// name, reloadTime, energyUsage, power, shieldPiercing, color, speed, range, value, desc
export const shipGuns = [
  new ShipGun('ValMet S1', 10, 2, 12, 0, 'red', 20, 400, 300, 'good self-defence beam gun.')
];

export const shipModules = [];