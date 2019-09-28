/*  gameData of players, opponents, planets etc. */

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
  docks: ['Earth Trading Center', 'Luna Station', 'Mars Docks', 'Saturnus Mining Center', 'Jupiter Mining Center', 'Uranus Outpost']
  },
  {name: 'Outlaw star', 
  desc: 'Dangerous place.',
  security: 'Dangerous.',
  docks: ['outlow1', 'outlow2', 'outlaw3']
  },
  {name: 'Elf star', 
  desc: 'safe place, lots of forests',
  security: 'oke.',
  docks: ['elf1', 'elf2', 'elf3', 'elf4', 'elf5']
  },
  {name: 'dark star', 
  desc: 'Dangerous place.',
  security: 'Dangerous.',
  docks: ['dar1', 'dar2', 'dar3']
  },
  {name: 'Robotic star', 
  desc: 'robotic place.',
  security: 'okey i guess.',
  docks: ['robt1', 'rob2', 'rob3', 'rob4', 'rob5']
  },
  {name: 'mixed star', 
  desc: 'capitalist place.',
  security: 'oke.',
  docks: ['m1', 'm2', 'm3']}
];
