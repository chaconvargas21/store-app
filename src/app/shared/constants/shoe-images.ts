import { Item } from '../interfaces/item.interface';

// La API no guarda imágenes de producto: la foto sale del nombre del producto.
// Ajustado a los 20 productos de /api/product (shoe-images.spec.ts lo verifica);
// si store-back agrega un producto, sumarle su foto acá (créditos en productos/CREDITOS.md).
const PRODUCT_IMAGES: Record<string, string> = {
  'zapatilla running': 'productos/zapatilla-running.jpg',
  'zapatilla urbana': 'productos/zapatilla-urbana.jpg',
  'zapatilla de lona': 'productos/zapatilla-lona.jpg',
  'zapatilla de basquet': 'productos/zapatilla-basquet.jpg',
  'zapatilla trail': 'productos/zapatilla-trail.jpg',
  'zapatilla slip-on': 'productos/zapatilla-slip-on.jpg',
  'mocasin': 'productos/mocasin.jpg',
  'zapato oxford': 'productos/zapato-oxford.jpg',
  'zapato derby': 'productos/zapato-derby.jpg',
  'nautico': 'productos/nautico.jpg',
  'bota chelsea': 'calzado-3.jpg',
  'borcego': 'calzado-5.jpg',
  'bota de trekking': 'calzado-4.jpg',
  'bota de lluvia': 'productos/bota-lluvia.jpg',
  'botineta': 'calzado-2.jpg',
  'sandalia': 'productos/sandalia.jpg',
  'ojota': 'productos/ojota.jpg',
  'alpargata': 'productos/alpargata.jpg',
  'stiletto': 'productos/stiletto.jpg',
  'pantufla': 'productos/pantufla.jpg',
};

// Producto sin foto asignada: imagen genérica en vez de la de otro calzado.
export const FALLBACK_IMAGE = './assets/generic.jpg';

function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase();
}

export function shoeImage(item: Pick<Item, 'product'> | undefined): string {
  const file = item && PRODUCT_IMAGES[normalize(item.product)];
  return file ? `./assets/images/${file}` : FALLBACK_IMAGE;
}
