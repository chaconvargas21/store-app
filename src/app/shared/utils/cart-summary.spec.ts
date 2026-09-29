import { ItemCart } from '../interfaces/item.interface';
import { summarizeCart } from './cart-summary';

describe('summarizeCart', () => {
  const line = (quantity: number, price: number): ItemCart => ({
    item: { _id: 'x', product: 'x', price: price / quantity, size: '40', quantity: 10, material: '', manufacturer: '' },
    quantity,
    price,
  });

  it('suma unidades y precios de línea', () => {
    expect(summarizeCart([line(2, 200), line(1, 50)])).toEqual({ totalQuantity: 3, totalPrice: 250 });
  });

  it('carrito vacío: todo en cero', () => {
    expect(summarizeCart([])).toEqual({ totalQuantity: 0, totalPrice: 0 });
  });
});
