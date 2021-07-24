import {createAction} from 'deox';
import {CategoryModel} from '../../models/category.model';

export const addCategoryAction = createAction('ADD_CATEGORY_ACTION',
    resolve => (model: CategoryModel) => resolve({model}),
);

export const updateCategoryAction = createAction('UPDATE_CATEGORY_ACTION',
    resolve => (id: string, model: Partial<CategoryModel>) => resolve({id, model}),
);

export const deleteCategoryAction = createAction('DELETE_CATEGORY_ACTION',
    resolve => (id: string) => resolve({id}),
);
