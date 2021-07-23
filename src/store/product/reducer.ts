import {ProductStore} from './types';
import {createReducer} from 'deox';
import {addProductAction, deleteProductAction, updateProductAction} from './actions';
import {v4 as uuidv4} from 'uuid';

const initialState: ProductStore = {
    list: [],
};

export const productReducer = createReducer(initialState, handle => [
    handle(addProductAction, (state, {payload: {product}}) => {
        product = {...product, id: uuidv4()};
        return {...state, list: [...state.list, product]};
    }),
    handle(updateProductAction, (state, {payload: {product, id}}) => {
        const foundProduct = state.list.find(item => item.id === id);
        if (foundProduct) {
            return {...state, list: [...state.list.filter(item => item.id !== id), {...foundProduct, ...product}]};
        }
        return state;
    }),
    handle(deleteProductAction, (state, {payload: {id}}) => {
        const foundProduct = state.list.find(item => item.id === id);
        if (foundProduct) {
            return {
                ...state,
                list: [...state.list.filter(item => item.id !== id), {
                    ...foundProduct,
                    deleted_at: new Date().toISOString(),
                }],
            };
        }
        return state;
    }),
]);
