import { Item } from '../interfaces/item.interface';
import { SHOE_CATEGORIES, SHOE_COLLECTIONS, matchesCategory, matchesSearch } from './categories';

// Nombre, marca y material de los productos de /api/product (store-back).
const PRODUCTS: [string, string, string][] = [
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

const items: Item[] = PRODUCTS.map(([product, manufacturer, material], i) => ({
  _id: String(i),
  product,
  manufacturer,
  material,
  price: 100,
  size: '40',
  quantity: 1,
}));

function names(slug: string): string[] {
  return items.filter((item) => matchesCategory(item, slug)).map((item) => item.product);
}

describe('categories', () => {
  it('ninguna categoría ni colección queda vacía', () => {
    for (const { slug } of [...SHOE_CATEGORIES, ...SHOE_COLLECTIONS]) {
      expect(names(slug).length).withContext(slug).toBeGreaterThan(0);
    }
  });

  it('todo producto cae en alguna categoría', () => {
    const uncategorized = items.filter(
      (item) => !SHOE_CATEGORIES.some(({ slug }) => matchesCategory(item, slug))
    );
    expect(uncategorized.map((item) => item.product)).toEqual([]);
  });

  it('la marca no mete productos en otra colección', () => {
    // "Andes Sport" no es running; "Urban Step" no es casual.
    expect(names('running')).toEqual(['Zapatilla running', 'Zapatilla trail']);
    expect(names('casual')).not.toContain('Borcego');
  });

  it('ignora tildes y mayúsculas', () => {
    expect(names('formal')).toContain('Mocasín');
    expect(items.filter((item) => matchesSearch(item, 'NAUTICO')).length).toBe(1);
  });
});
