import {BaseModel} from './base.model';

export interface ProductModel extends BaseModel {
    name: string;
    price: number;
    image: string | null;
    barcode: string | null;
    stock_available: number;
    is_favorite: boolean;
    category_id_list: string[];
}
