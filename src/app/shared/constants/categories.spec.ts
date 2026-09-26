import { items } from './products.testing';
import { SHOE_CATEGORIES, SHOE_COLLECTIONS, matchesCategory, matchesSearch } from './categories';

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
