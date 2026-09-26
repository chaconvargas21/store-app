import { FALLBACK_IMAGE, shoeImage } from './shoe-images';
import { items } from './products.testing';

describe('shoeImage', () => {
  it('cada producto de la API tiene su propia foto', () => {
    const images = items.map((item) => shoeImage(item));
    expect(images).not.toContain(FALLBACK_IMAGE);
    expect(new Set(images).size).toBe(items.length);
  });

  it('no depende de tildes ni mayúsculas', () => {
    expect(shoeImage({ product: 'MOCASIN' })).toBe(shoeImage({ product: 'Mocasín' }));
  });

  it('un producto desconocido usa la imagen genérica', () => {
    expect(shoeImage({ product: 'Zueco' })).toBe(FALLBACK_IMAGE);
    expect(shoeImage(undefined)).toBe(FALLBACK_IMAGE);
  });

  it('todas las fotos existen en assets', async () => {
    const images = [...items.map((item) => shoeImage(item)), FALLBACK_IMAGE];
    const statuses = await Promise.all(images.map((src) => fetch(src, { method: 'HEAD' }).then((r) => r.status)));
    expect(statuses).toEqual(images.map(() => 200));
  });
});
