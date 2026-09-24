// La API no guarda imágenes de producto: se asigna una foto de calzado
// según la posición del producto en la lista.
export const SHOE_IMAGES = [
  './assets/images/calzado-1.jpg',
  './assets/images/calzado-2.jpg',
  './assets/images/calzado-3.jpg',
  './assets/images/calzado-4.jpg',
  './assets/images/calzado-5.jpg',
];

export function shoeImage(index: number): string {
  return SHOE_IMAGES[index % SHOE_IMAGES.length];
}
