import React, {useCallback, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ProductModel} from '../../models/product.model';
import {useProduct} from '../../store/product/hooks';
import {useCategory} from '../../store/category/hooks';

const ProductScreen = () => {
    const [showDeleted, setShowDeleted] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
    const {products, addProduct, updateProduct, deleteProduct} = useProduct();
    const {categories} = useCategory();
    const {register, handleSubmit, reset} = useForm();

    const onSubmit = useCallback((data: ProductModel) => {
        if (selectedProduct) {
            updateProduct(selectedProduct.id, data);
        } else {
            addProduct({...data, deleted_at: null});
        }
        setSelectedProduct(null);
        reset({});
    }, [reset, selectedProduct, updateProduct, addProduct, setSelectedProduct]);

    const selectProduct = useCallback((product: ProductModel) => {
        if (selectedProduct?.id === product.id) {
            setSelectedProduct(null);
            reset({});
        } else {
            setSelectedProduct(product);
            reset(product);
        }
    }, [selectedProduct, setSelectedProduct, reset]);

    const onProductDelete = useCallback(() => {
        if (selectedProduct) {
            deleteProduct(selectedProduct.id);
            setSelectedProduct(null);
            reset({});
        }
    }, [selectedProduct, setSelectedProduct, reset, deleteProduct]);

    const onProductRestore = useCallback(() => {
        if (selectedProduct) {
            updateProduct(selectedProduct.id, {...selectedProduct, deleted_at: null});
            setSelectedProduct(null);
            reset({});
        }
    }, [selectedProduct, reset, updateProduct, setSelectedProduct]);

    return (
        <div id="productPage">
            <fieldset>
                <legend>Ürün</legend>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{display: 'flex', flexDirection: 'row', marginBottom: '12px'}}>
                        <label style={{display: 'flex', flexDirection: 'column', marginRight: '6px'}}>
                            <span>İsim</span>
                            <input type="text" {...register('name', {required: true})} />
                        </label>
                        <label style={{display: 'flex', flexDirection: 'column'}}>
                            <span>Barkod</span>
                            <input type="text" {...register('barcode', {required: false})} />
                        </label>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', marginBottom: '12px'}}>
                        <label style={{display: 'flex', flexDirection: 'column', marginRight: '6px'}}>
                            <span>Fiyat</span>
                            <input type="number" step="0.01" min="0" {...register('price', {
                                required: true,
                                valueAsNumber: true,
                                min: 0,
                            })} />
                        </label>
                        <label style={{display: 'flex', flexDirection: 'column'}}>
                            <span>Stok</span>
                            <input type="number" step="0.01" {...register('stock_available', {
                                required: true,
                                valueAsNumber: true,
                            })} />
                        </label>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', marginBottom: '12px'}}>
                        <label style={{display: 'flex', flexDirection: 'column', marginRight: '6px'}}>
                            <span>Resim</span>
                            <input type="text" {...register('image', {required: false})} />
                        </label>
                        <label style={{display: 'flex', flexDirection: 'column'}}>
                            <span>Favori Ürün mü?</span>
                            <input type="checkbox" {...register('is_favorite')} />
                        </label>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', marginBottom: '12px'}}>
                        <label style={{display: 'flex', flexDirection: 'column', marginRight: '6px'}}>
                            <span>Kategoriler</span>
                            <select multiple {...register('category_id_list')}>
                                {categories.map(category =>
                                    <option key={category.id} value={category.id}>{category.name}</option>,
                                )}
                            </select>
                        </label>
                    </div>
                    <button type="submit">Kaydet</button>
                    {selectedProduct && (
                        selectedProduct.deleted_at === null ? (
                            <button type="button" onClick={() => onProductDelete()}>
                                Sil
                            </button>
                        ) : (
                            <button type="button" onClick={() => onProductRestore()}>
                                Kurtar
                            </button>
                        )
                    )}
                </form>
            </fieldset>
            <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '12px'}}>
                <thead>
                <tr>
                    <th style={{border: '1px solid #000'}}/>
                    <th style={{border: '1px solid #000'}}>Barkod</th>
                    <th style={{border: '1px solid #000'}}>İsim</th>
                    <th style={{border: '1px solid #000'}}>Fiyat</th>
                    <th style={{border: '1px solid #000'}}>Stok</th>
                    <th style={{border: '1px solid #000'}}>
                        <button type="button" onClick={() => setShowDeleted(!showDeleted)}>
                            {!showDeleted && <span>Çöp Kutusu</span>}
                            {showDeleted && <span>Ürünler</span>}
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {products.filter(t => showDeleted ? (t.deleted_at !== null) : t.deleted_at === null).map(product => (
                    <tr key={product.id}>
                        <td style={{border: '1px solid #000'}}>
                            {product.image &&
                            <img src={product.image} alt={product.name} style={{width: '64px', height: '64px'}}/>}
                        </td>
                        <td style={{border: '1px solid #000'}}>{product.barcode}</td>
                        <td style={{border: '1px solid #000'}}>{product.name}</td>
                        <td style={{border: '1px solid #000'}}>{product.price}</td>
                        <td style={{border: '1px solid #000'}}>{product.stock_available}</td>
                        <td style={{border: '1px solid #000'}}>
                            <button type="button" onClick={() => selectProduct(product)}>
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

export default ProductScreen;
