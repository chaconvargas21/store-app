import { Item } from '../interfaces/item.interface';

export interface ShoeCategory {
  slug: string;
  label: string;
  keywords: string[];
}

// El backend no tiene categorías: se filtra en el cliente buscando estas
// palabras clave en el nombre, la marca y el material del producto.
// Ajustadas a los 20 productos de /api/product (categories.spec.ts las verifica):
// ojo con las marcas, `sport` o `urban` matchean "Andes Sport" / "Urban Step".
const CASUAL_KEYWORDS = ['casual', 'urbana', 'lona', 'nautico', 'alpargata', 'pantufla'];

export const SHOE_CATEGORIES: ShoeCategory[] = [
  { slug: 'zapatillas', label: 'Zapatillas', keywords: ['zapatilla', 'sneaker', 'tenis'] },
  { slug: 'botas', label: 'Botas', keywords: ['bota', 'botin', 'borcego'] },
  { slug: 'formal', label: 'Formal', keywords: ['formal', 'oxford', 'derby', 'mocasin', 'stiletto'] },
  { slug: 'casual', label: 'Casual', keywords: CASUAL_KEYWORDS },
  { slug: 'sandalias', label: 'Sandalias', keywords: ['sandalia', 'ojota'] },
];

// Colecciones destacadas (home, navbar y página de colecciones).
// Los productos no tienen un dato de "edición limitada": se usan los materiales especiales.
export const SHOE_COLLECTIONS = [
  { slug: 'running', label: 'Running', keywords: ['running', 'trail', 'malla tecnica'] },
  { slug: 'casual', label: 'Casual', keywords: CASUAL_KEYWORDS },
  { slug: 'edicion-limitada', label: 'Edición limitada', keywords: ['charol', 'gamuza', 'nobuk'] },
];

const ALL_FILTERS: ShoeCategory[] = [...SHOE_CATEGORIES, ...SHOE_COLLECTIONS];

export function findCategory(slug: string | null): ShoeCategory | undefined {
  return ALL_FILTERS.find((c) => c.slug === slug);
}

function normalize(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function searchableText(item: Item): string {
  return normalize(`${item.product} ${item.manufacturer} ${item.material}`);
}

export function matchesCategory(item: Item, slug: string): boolean {
  const category = findCategory(slug);
  if (!category) return true;
  const text = searchableText(item);
  return category.keywords.some((k) => text.includes(normalize(k)));
}

export function matchesSearch(item: Item, query: string): boolean {
  const text = searchableText(item);
  return normalize(query).split(/\s+/).filter(Boolean).every((w) => text.includes(w));
}
