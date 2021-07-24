import {CategoryStore} from './types';
import {addCategoryAction, deleteCategoryAction, updateCategoryAction} from './actions';
import {listReducer} from '../list.slice';
import {CategoryModel} from '../../models/category.model';

const initialState: CategoryStore = {
    list: [],
};

export const categoryReducer = listReducer<CategoryModel>({
    initialState,
    addAction: addCategoryAction,
    deleteAction: deleteCategoryAction,
    updateAction: updateCategoryAction,
});
