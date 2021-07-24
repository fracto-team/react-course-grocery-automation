import {ProductModel} from '../../models/product.model';

export type BatchUpdateStockType = {
    id: string;
    stock: number;
}[];

export type ProductStore = {
    list: ProductModel[];
};
