import {createAction} from 'deox';
import {ProductModel} from '../../models/product.model';

export const addCartItemAction = createAction(
    'ADD_CART_ITEM_ACTION',
    resolve => (product: ProductModel, quantity: number) => resolve({product, quantity}),
);

export const updateCartItemAction = createAction(
    'UPDATE_CART_ITEM_ACTION',
    resolve => (id: string, quantity: number, price: number) => resolve({id, quantity, price}),
);

export const deleteCartItemAction = createAction(
    'DELETE_CART_ITEM_ACTION',
    resolve => (id: string) => resolve({id}),
);

export const clearCartAction = createAction(
    'CLEAR_CART_ACTION',
    resolve => () => resolve(),
);
