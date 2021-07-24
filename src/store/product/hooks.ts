import {useDispatch, useSelector} from 'react-redux';
import {RootStore} from '../index';
import {ProductModel} from '../../models/product.model';
import {addProductAction, batchUpdateStockAction, deleteProductAction, updateProductAction} from './actions';
import {useCallback} from 'react';
import {BatchUpdateStockType} from './types';

export const useProduct = () => {
    const dispatch = useDispatch();
    const products = useSelector<RootStore, ProductModel[]>(state => state.product.list);
    const addProduct = useCallback((product: ProductModel) => dispatch(addProductAction(product)), [dispatch]);
    const updateProduct = useCallback((id: string, product: Partial<ProductModel>) => dispatch(updateProductAction(id, product)), [dispatch]);
    const deleteProduct = useCallback((id: string) => dispatch(deleteProductAction(id)), [dispatch]);
    const batchUpdateStock = useCallback((batch: BatchUpdateStockType) => dispatch(batchUpdateStockAction(batch)), [dispatch]);

    return {products, addProduct, updateProduct, deleteProduct, batchUpdateStock};
};
