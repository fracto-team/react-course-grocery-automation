import {createAction} from 'deox';
import {ProductModel} from '../../models/product.model';
import {BatchUpdateStockType} from './types';

export const addProductAction = createAction('ADD_PRODUCT_ACTION',
    resolve => (model: ProductModel) => resolve({model}),
);

export const updateProductAction = createAction('UPDATE_PRODUCT_ACTION',
    resolve => (id: string, model: Partial<ProductModel>) => resolve({id, model}),
);

export const deleteProductAction = createAction('DELETE_PRODUCT_ACTION',
    resolve => (id: string) => resolve({id}),
);

export const batchUpdateStockAction = createAction('BATCH_UPDATE_STOCK_ACTION',
    resolve => (batch: BatchUpdateStockType) => resolve({batch}),
);
