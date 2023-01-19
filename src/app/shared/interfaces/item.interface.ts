export interface GetItemsResponse {
    ok: boolean;
    items: Item[];    
}

export interface GetItemByIdResponse {
    ok: boolean;
    item: Item;    
}

export interface AddItemResponse {
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

export interface Item {
    collectionId: {
        _id: string;
        description: string;
    };
    categoryId: {
        _id: string;
        description: string;
    };
    sizeId: {
        _id: string;
        description: string;
    }; 
    quantity: number;
    price: number;
    _id: string;
}