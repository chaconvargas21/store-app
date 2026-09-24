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

export interface RemoveItemResponse {
    ok: boolean;
    item: Item;    
}

export interface GetItemsCartShoppingResponse {
    ok: boolean;
    items: ItemCart[];
    totalPrice: number;    
}

export interface ItemCart {
    item: Item;
    quantity: number;
    price: number;
}

// Mismo shape que el modelo `Product` de store-back.
export interface Item {
    _id: string;
    product: string;
    price: number;
    size: string;
    quantity: number;
    material: string;
    manufacturer: string;
}
