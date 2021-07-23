import {createAction} from 'deox';
import {ProductModel} from '../../models/product.model';

export const addProductAction = createAction('ADD_PRODUCT_ACTION',
    resolve => (product: ProductModel) => resolve({product}),
);

export const updateProductAction = createAction('UPDATE_PRODUCT_ACTION',
    resolve => (id: string, product: Partial<ProductModel>) => resolve({id, product}),
);

export const deleteProductAction = createAction('DELETE_PRODUCT_ACTION',
    resolve => (id: string) => resolve({id}),
);
