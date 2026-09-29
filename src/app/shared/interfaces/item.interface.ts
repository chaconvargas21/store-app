export interface GetItemsResponse {
    ok: boolean;
    products: Item[];
}

export interface GetItemByIdResponse {
    ok: boolean;
    product: Item;
}

export interface AddItemResponse {
    ok: boolean;
    item: Item;    
}

// DELETE /api/cart/:id solo responde { ok }.
export interface RemoveItemResponse {
    ok: boolean;
}

export interface GetItemsCartShoppingResponse {
    ok: boolean;
    items: ItemCart[];
    totalPrice: number;    
}

// Línea del carrito: `quantity` son las unidades en el carrito y `price` el
// precio de la línea (unitario × quantity), no el del producto.
export interface ItemCart {
    item: Item;
    quantity: number;
    price: number;
}

// Mismo shape que el modelo `Product` de store-back. `quantity` es el stock
// disponible y `product` el nombre (se usa para categorías y fotos).
export interface Item {
    _id: string;
    product: string;
    price: number;
    size: string;
    quantity: number;
    material: string;
    manufacturer: string;
}
