import { Item } from '../interfaces/item.interface';

// Nombre, marca y material de los productos de /api/product (store-back).
export const PRODUCTS: [string, string, string][] = [
  ['Zapatilla running', 'Andes Sport', 'Malla técnica'],
  ['Zapatilla urbana', 'Urban Step', 'Cuero'],
  ['Zapatilla de lona', 'Costa Basics', 'Lona'],
  ['Zapatilla de básquet', 'Andes Sport', 'Cuero sintético'],
  ['Zapatilla trail', 'Andes Sport', 'Malla técnica'],
  ['Zapatilla slip-on', 'Urban Step', 'Lona'],
  ['Mocasín', 'Nordic Leather', 'Cuero'],
  ['Zapato oxford', 'Nordic Leather', 'Cuero'],
  ['Zapato derby', 'Nordic Leather', 'Cuero'],
  ['Náutico', 'Costa Basics', 'Gamuza'],
  ['Bota Chelsea', 'Nordic Leather', 'Cuero'],
  ['Borcego', 'Urban Step', 'Cuero'],
  ['Bota de trekking', 'Andes Sport', 'Nobuk'],
  ['Bota de lluvia', 'Costa Basics', 'Caucho'],
  ['Botineta', 'Urban Step', 'Gamuza'],
  ['Sandalia', 'Costa Basics', 'Cuero'],
  ['Ojota', 'Costa Basics', 'Goma EVA'],
  ['Alpargata', 'Costa Basics', 'Yute'],
  ['Stiletto', 'Urban Step', 'Charol'],
  ['Pantufla', 'Nordic Leather', 'Polar'],
];

export const items: Item[] = PRODUCTS.map(([product, manufacturer, material], i) => ({
  _id: String(i),
  product,
  manufacturer,
  material,
  price: 100,
  size: '40',
  quantity: 1,
}));
