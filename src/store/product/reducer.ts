import {BatchUpdateStockType, ProductStore} from './types';
import {addProductAction, batchUpdateStockAction, deleteProductAction, updateProductAction} from './actions';
import {listReducer} from '../list.slice';
import {ProductModel} from '../../models/product.model';

const initialState: ProductStore = {
    list: [],
};

export const productReducer = listReducer<ProductModel>({
    initialState,
    addAction: addProductAction,
    deleteAction: deleteProductAction,
    updateAction: updateProductAction,
    extra: (handle) => [
        handle(batchUpdateStockAction, (state, payload) => {
            const batch = payload.batch as BatchUpdateStockType;
            batch.forEach(({id, stock}) => {
                const found = state.list.find(item => item.id === id);
                if (found) {
                    state = {
                        ...state,
                        list: [...state.list.filter(item => item.id !== id), {...found, stock_available: stock}],
                    };
                }
            });
            return state;
        }),
    ],
});
