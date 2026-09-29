import { ItemCart } from '../interfaces/item.interface';

export interface CartSummary {
  totalQuantity: number;
  totalPrice: number;
}

// Totales del carrito calculados en el cliente: el `totalPrice` de store-back
// suma el precio de línea (no el unitario) en cada add, así que se infla con
// cantidad > 1. Cada `ItemCart.price` ya es el precio de su línea.
export function summarizeCart(items: ItemCart[]): CartSummary {
  return {
    totalQuantity: items.reduce((sum, i) => sum + i.quantity, 0),
    totalPrice: items.reduce((sum, i) => sum + i.price, 0),
  };
}
