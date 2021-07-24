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
        handle(batchUpdateStockAction, (state, {payload}) => {
            const batch = payload.batch as BatchUpdateStockType;
            return {
                ...state,
                list: state.list.map(item => {
                    const batchItem = batch.find(b => b.id === item.id);
                    if (batchItem) {
                        return {...item, stock_available: batchItem.stock};
                    }
                    return item;
                }),
            };
        }),
    ],
});
