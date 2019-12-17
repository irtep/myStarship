import { Armour, Weapon} from '../classes.js';

// ARMOURS: characters, armours, weapons, races, guilds
// constructor(name, value, save, requirements, img, artBy, desc, stats)
export const armours = [
  new Armour('kevlar breastplate', 100, 5, {race: 'all', limb: 'torso', minStr: 1}, null, null, 
             `Lightweight but hard breastplate. Cheap choice that offers some protection against basic weapons.`,
  {str: 0, speed: 0, con: 0})
  
];

// WEAPONS
// (name, value, size, requirements, power, armourPiercing, minRange, maxRange, attacks, isMeleeWeapon, img, sound, artBy, desc) 
export const weapons = [
  // melee weapons:                                                                        s, ap, mi, max, , a, melee
  new Weapon('dreadnought fist', 1000, 1, {race: 'dreadnought', limb: 'hand', minStr: 15}, 6, 3, 0,  20, 1, true, null, null,
            `Huge powered metal fist connected to users suit and nerve systems. Absolutely deadly melee weapon.`),
  
  // ranged weapons:
  new Weapon('heavy flamer', 500, 1,      {race: 'all', limb: 'hand', minStr: 10},         12, 1, 15, 100, 1, false, null, null,
             `Deadly but short ranged melee weapon that shoots target with a salvo of liquid flame. Pyromans wet day dream.`),
  new Weapon('victorivich', 100, 2,      {race: 'all', limb: 'hand', minStr: 5},  10, 0, 15, 700, 2, false, null, null, 
             `Cheap but effective. Victor Weapons Company's Victor Assault Rifle is an AK-47 of modern day.
This weapon doesn't require any maintenance at all. It fires almost anything.. all small caliber ammunition.. hell, you can
even add there some dices or pens or whatever of about those sizes and they come out spitting death! (still, real ammunition is 
recommended for optimal fire power.)`)
];
