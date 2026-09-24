import { Item } from '../interfaces/item.interface';

export interface ShoeCategory {
  slug: string;
  label: string;
  keywords: string[];
}

// El backend no tiene categorías: se filtra en el cliente buscando estas
// palabras clave en el nombre, la marca y el material del producto.
export const SHOE_CATEGORIES: ShoeCategory[] = [
  { slug: 'zapatillas', label: 'Zapatillas', keywords: ['zapatilla', 'sneaker', 'tenis', 'running'] },
  { slug: 'botas', label: 'Botas', keywords: ['bota', 'botin', 'boot'] },
  { slug: 'formal', label: 'Formal', keywords: ['formal', 'oxford', 'mocasin', 'vestir'] },
  { slug: 'casual', label: 'Casual', keywords: ['casual', 'urbano', 'lona'] },
  { slug: 'sandalias', label: 'Sandalias', keywords: ['sandalia', 'sandal'] },
];

// Colecciones destacadas (home, navbar y página de colecciones).
export const SHOE_COLLECTIONS = [
  { slug: 'running', label: 'Running', keywords: ['running', 'deportiv', 'sport'] },
  { slug: 'casual', label: 'Casual', keywords: ['casual', 'urbano', 'lona'] },
  { slug: 'edicion-limitada', label: 'Edición limitada', keywords: ['limitad', 'edicion', 'premium'] },
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
