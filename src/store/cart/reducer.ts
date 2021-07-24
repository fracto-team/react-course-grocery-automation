import {CartStore} from './types';
import {v4 as uuidv4} from 'uuid';
import {createReducer} from 'deox';
import {addCartItemAction, clearCartAction, deleteCartItemAction, updateCartItemAction} from './actions';

export const initialState: CartStore = {
    current: {id: uuidv4(), items: []},
};

export const cartReducer = createReducer(
    initialState,
    handle => [
        handle(addCartItemAction, (state, {payload: {product, quantity}}) => {
            const found = state.current.items.find(item => item.product.id === product.id);
            if (found) {
                return {
                    ...state,
                    current: {
                        ...state.current,
                        items: [
                            ...state.current.items.filter(item => item.product.id !== product.id),
                            {...found, quantity: quantity + found.quantity},
                        ],
                    },
                };
            }
            return {
                ...state,
                current: {
                    ...state.current,
                    items: [
                        ...state.current.items,
                        {id: uuidv4(), quantity, product, original_price: product.price, price: product.price},
                    ],
                },
            };
        }),
        handle(updateCartItemAction, (state, {payload: {id, price, quantity}}) => {
            const found = state.current.items.find(item => item.id === id);
            if (found) {
                if (quantity > 0) {
                    return {
                        ...state,
                        current: {
                            ...state.current,
                            items: [
                                ...state.current.items.filter(item => item.id !== id),
                                {...found, quantity: quantity, price},
                            ],
                        },
                    };
                }

                return {
                    ...state,
                    current: {
                        ...state.current,
                        items: [
                            ...state.current.items.filter(item => item.id !== id),
                        ],
                    },
                };
            }
            return state;
        }),
        handle(deleteCartItemAction, (state, {payload: {id}}) => {
            return {
                ...state,
                current: {
                    ...state.current,
                    items: state.current.items.filter(item => item.id !== id),
                },
            };
        }),
        handle(clearCartAction, () => {
            return {current: {id: uuidv4(), items: []}};
        }),
    ],
);
