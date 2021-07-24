import {BaseModel} from './base.model';

export interface CategoryModel extends BaseModel {
    name: string;
    color: string | null;
}
