/*  gameData of players, opponents, planets etc. */
import { goods } from './classes.js';
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
    location: null,
    
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
export const avatars = [
  {name: 'bigDread', url: 'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2Fdread.png?v=1569043619713', desc: `You are crippled human, but it doesn't matter as you have this powerful exoskeleton,
that makes you way more powerful than most of the creatures around the galaxy.`,
  stats: null,
  race: 'human' 
  },
  {name: 'Pontitos', url: 'https://cdn.glitch.com/3f44e207-d42e-45ee-8cec-c11c5fd0707a%2FScreenshot%202019-09-26%20at%208.30.56.png?v=1569475960131',
  desc: `You are a proud member of Pontitos folk. Physically they resemble earth dogs, but are about as intelligent as humans.`,
  stats: null,
  race: 'dogfolk'
  }
];

// systems:
export const systems = [ 
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
export const starMap = `
        <table class= "starMap">
          <center>
          <th> Systems on range: </th>
          </center>
          <tr>
            <td class= "systems systems3"></td>
            <td class= "systems">.</td>
            <td class= "systems"></td>
            <td class= "systems systems2"><div id= "Sol">.</div></td>
            <td class= "systems"></td>
            <td class= "systems systems2"><div id= "El Agostin">.</div></td>
          </tr>
          <tr>
            <td class= "systems"></td>
            <td class= "systems"></td>
            <td class= "systems systems2"><div id= "Tingomaria">.</div></td>
            <td class= "systems"></td>
            <td class= "systems">.</td>
            <td class= "systems"></td>
          </tr>
          <tr>
            <td class= "systems">.</td>
            <td class= "systems"></td>
            <td class= "systems systems2"><div id= "Drooklyn">.</div></td>
            <td class= "systems"></td>
            <td class= "systems"></td>
            <td class= "systems"></td>
          </tr>
          <tr>
            <td class= "systems"></td>
            <td class= "systems"></td>
            <td class= "systems">.</td>
            <td class= "systems systems2"><div id= "Safe Haven">.</div></td>
            <td class= "systems systems3">.</td>
            <td class= "systems systems2"><div id= "The Liberty Star">.</div></td>
          </tr>
        </table>`;

export const products = [
  new Goods('common metals', 'metals sucks as steel, iron, copper etc. usefull for many stuff', 100, 'materials'),
  new Goods('water', 'water is life! and life is precious. There might be huge price differences on this classis good as somewhere there can be plenty of this and somewhere none', 100, 'grocery'),
  new Goods('military weapons', 'including heavy weapons like fighter jets and small deadly items like assault rifles, this item will be hot in very many places!', 300, 'weapons')
];
