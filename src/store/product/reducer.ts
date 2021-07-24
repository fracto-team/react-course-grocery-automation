import {ProductStore} from './types';
import {addProductAction, deleteProductAction, updateProductAction} from './actions';
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
});
