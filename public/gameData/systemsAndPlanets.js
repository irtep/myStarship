import { StarSystem, Location, Station } from '../classes.js';

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