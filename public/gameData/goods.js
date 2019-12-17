import { Goods } from '../classes.js';

// Products to sell and buy
export const products = [  // name, desc, basePrice, type
  new Goods('common metals', 'metals such as steel, iron, copper etc. usefull for many stuff', 100, 'materials'),
  new Goods('water', 'water is life! and life is precious. There might be huge price differences on this classis good as somewhere there can be plenty of this and somewhere none', 100, 'grocery'),
  new Goods('military weapons', 'including heavy weapons like fighter jets and small deadly items like assault rifles, this item will be hot in very many places!', 300, 'weapons')
];