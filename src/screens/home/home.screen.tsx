import React, {useCallback, useState} from 'react';
import {useProduct} from '../../store/product/hooks';
import {useCart} from '../../store/cart/hooks';
import {useCategory} from '../../store/category/hooks';
import {ProductModel} from '../../models/product.model';
import {CartItemModel} from '../../models/cart.model';
import {BatchUpdateStockType} from '../../store/product/types';

const HomeScreen = () => {
    const {products, batchUpdateStock} = useProduct();
    const {categories} = useCategory();
    const {total, items, addItem, deleteItem, updateItem, clear} = useCart();
    const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
    const [quantity, setQuantity] = useState(1);

    const selectProduct = useCallback((product: ProductModel) => {
        if (selectedProduct && selectedProduct.id === product.id) {
            setSelectedProduct(null);
        } else {
            setSelectedProduct(product);
        }
        setQuantity(1);
    }, []);

    const addToCart = useCallback(() => {
        if (selectedProduct) {
            addItem(selectedProduct, quantity);
        }
        setSelectedProduct(null);
        setQuantity(1);
    }, [selectedProduct, quantity, addItem]);

    const itemQuantityChanged = useCallback((item: CartItemModel, quantity: number) => {
        updateItem(item.id, quantity, item.price);
    }, [updateItem]);

    const itemPriceChanged = useCallback((item: CartItemModel, price: number) => {
        updateItem(item.id, item.quantity, price);
    }, [updateItem]);

    const sellCash = useCallback(() => {
        const batch: BatchUpdateStockType = items.map(item => {
            return {id: item.product.id, stock: item.product.stock_available - item.quantity};
        });
        batchUpdateStock(batch);
        clear();
    }, [items, batchUpdateStock, clear]);

    return (
        <>
            <fieldset>
                <legend>Ürün</legend>
                <label>
                    <span>Ürün</span>
                    <input type="text" readOnly={true} disabled={true}
                           value={selectedProduct ? selectedProduct.name : ''}/>
                </label>
                <label>
                    <span>Adet</span>
                    <input type="text" value={quantity} onChange={(e) => setQuantity(+e.target.value)}/>
                </label>
                <button type="button" onClick={() => addToCart()}>
                    Sepete Ekle
                </button>
                {items.length > 0 && (
                    <>
                        <button type="button" onClick={() => clear()}>
                            Sepeti Temizle
                        </button>
                        <button type="button" onClick={() => sellCash()}>
                            Nakit Satış
                        </button>
                    </>
                )}
            </fieldset>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <table style={{width: '50%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '12px'}}>
                    <thead>
                    <tr>
                        <th style={{border: '1px solid #000'}}/>
                        <th style={{border: '1px solid #000'}}>İsim</th>
                        <th style={{border: '1px solid #000'}}>Fiyat</th>
                        <th style={{border: '1px solid #000'}}>Adet</th>
                        <th style={{border: '1px solid #000'}}>Toplam</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td style={{border: '1px solid #000'}}>
                                {item.product.image &&
                                <img src={item.product.image} alt={item.product.name}
                                     style={{width: '64px', height: '64px'}}/>}
                            </td>
                            <td style={{border: '1px solid #000'}}>{item.product.name}</td>
                            <td style={{border: '1px solid #000'}}><input type="number"
                                                                          onChange={(e) => itemPriceChanged(item, +e.target.value)}
                                                                          value={item.price}/></td>
                            <td style={{border: '1px solid #000'}}>
                                <input type="number"
                                       onChange={(e) => itemQuantityChanged(item, +e.target.value)}
                                       value={item.quantity}/>
                                <button type="button" onClick={() => deleteItem(item.id)}>
                                    Kaldır
                                </button>
                            </td>
                            <td style={{border: '1px solid #000'}}>{item.price * item.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <th style={{border: '1px solid #000'}} colSpan={4}/>
                        <th style={{border: '1px solid #000'}}>
                            {total}
                        </th>
                    </tr>
                    </tfoot>
                </table>
                <table style={{width: '50%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '12px'}}>
                    <thead>
                    <tr>
                        <th style={{border: '1px solid #000'}}/>
                        <th style={{border: '1px solid #000'}}>Barkod</th>
                        <th style={{border: '1px solid #000'}}>İsim</th>
                        <th style={{border: '1px solid #000'}}>Fiyat</th>
                        <th style={{border: '1px solid #000'}}>Stok</th>
                        <th style={{border: '1px solid #000'}}>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.filter(t => t.deleted_at === null && t.is_favorite).map(product => (
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
        </>
    );
};

export default HomeScreen;
