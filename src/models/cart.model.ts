import {ProductModel} from './product.model';

export type CartItemModel = {
    id: string;
    product: ProductModel;
    quantity: number;
    original_price: number;
    price: number;
}

export type CartModel = {
    id: string;
    items: CartItemModel[];
}
