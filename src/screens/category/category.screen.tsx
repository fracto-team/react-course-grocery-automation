import React, {useCallback, useState} from 'react';
import {useCategory} from '../../store/category/hooks';
import {useForm} from 'react-hook-form';
import {CategoryModel} from '../../models/category.model';
import {ColorResult, SwatchesPicker} from 'react-color';

const CategoryScreen = () => {
    const [showDeleted, setShowDeleted] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryModel | null>(null);
    const {categories, addCategory, updateCategory, deleteCategory} = useCategory();
    const {register, handleSubmit, reset, watch, setValue} = useForm();

    const onSubmit = useCallback((data: CategoryModel) => {
        if (selectedCategory) {
            updateCategory(selectedCategory.id, data);
        } else {
            addCategory({...data, deleted_at: null});
        }
        setSelectedCategory(null);
        reset({});
    }, [reset, selectedCategory, updateCategory, addCategory, setSelectedCategory]);

    const selectCategory = useCallback((category: CategoryModel) => {
        if (selectedCategory?.id === category.id) {
            setSelectedCategory(null);
            reset({});
        } else {
            setSelectedCategory(category);
            reset(category);
        }
    }, [selectedCategory, setSelectedCategory, reset]);

    const onCategoryDelete = useCallback(() => {
        if (selectedCategory) {
            deleteCategory(selectedCategory.id);
            setSelectedCategory(null);
            reset({});
        }
    }, [selectedCategory, setSelectedCategory, reset, deleteCategory]);

    const onCategoryRestore = useCallback(() => {
        if (selectedCategory) {
            updateCategory(selectedCategory.id, {...selectedCategory, deleted_at: null});
            setSelectedCategory(null);
            reset({});
        }
    }, [selectedCategory, reset, setSelectedCategory, updateCategory]);

    const colorChanged = useCallback((color: ColorResult) => {
        setValue('color', color.hex);
        console.log({color});
    }, [setValue]);

    return (
        <div id="categoryPage">
            <fieldset>
                <legend>Kategori</legend>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{display: 'flex', flexDirection: 'row', marginBottom: '12px'}}>
                        <label style={{display: 'flex', flexDirection: 'column', marginRight: '6px'}}>
                            <span>İsim</span>
                            <input type="text" {...register('name', {required: true})} />
                        </label>
                        <label style={{display: 'flex', flexDirection: 'column', marginRight: '6px'}}>
                            <span>Renk</span>
                            <SwatchesPicker color={watch('color')}
                                            onChangeComplete={(color) => colorChanged(color)}/>
                        </label>
                    </div>
                    <button type="submit">Kaydet</button>
                    {selectedCategory && (
                        selectedCategory.deleted_at === null ? (
                            <button type="button" onClick={() => onCategoryDelete()}>
                                Sil
                            </button>
                        ) : (
                            <button type="button" onClick={() => onCategoryRestore()}>
                                Kurtar
                            </button>
                        )
                    )}
                </form>
            </fieldset>
            <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '12px'}}>
                <thead>
                <tr>
                    <th style={{border: '1px solid #000'}}>İsim</th>
                    <th style={{border: '1px solid #000'}}>Renk</th>
                    <th style={{border: '1px solid #000'}}>
                        <button type="button" onClick={() => setShowDeleted(!showDeleted)}>
                            {!showDeleted && <span>Çöp Kutusu</span>}
                            {showDeleted && <span>Kategoriler</span>}
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {categories.filter(t => showDeleted ? (t.deleted_at !== null) : t.deleted_at === null).map(category => (
                    <tr key={category.id}>
                        <td style={{border: '1px solid #000'}}>{category.name}</td>
                        <td style={{border: '1px solid #000'}}>
                            <div style={{width: '32px', height: '32px', backgroundColor: category.color ?? '#fff'}}>
                                &nbsp;
                            </div>
                        </td>
                        <td style={{border: '1px solid #000'}}>
                            <button type="button" onClick={() => selectCategory(category)}>
                                Seç
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryScreen;
