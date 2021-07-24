import {useDispatch, useSelector} from 'react-redux';
import {RootStore} from '../index';
import {CategoryModel} from '../../models/category.model';
import {useCallback} from 'react';
import {addCategoryAction, deleteCategoryAction, updateCategoryAction} from './actions';

export const useCategory = () => {
    const dispatch = useDispatch();
    const categories = useSelector<RootStore, CategoryModel[]>(state => state.category.list);
    const addCategory = useCallback((category: CategoryModel) => dispatch(addCategoryAction(category)), [dispatch]);
    const updateCategory = useCallback((id: string, category: Partial<CategoryModel>) => dispatch(updateCategoryAction(id, category)), [dispatch]);
    const deleteCategory = useCallback((id: string) => dispatch(deleteCategoryAction(id)), [dispatch]);

    return {categories, addCategory, updateCategory, deleteCategory};
};
