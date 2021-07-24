import {useDispatch, useSelector} from 'react-redux';
import {RootStore} from '../index';
import {CartItemModel} from '../../models/cart.model';
import {useCallback, useMemo} from 'react';
import {addCartItemAction, clearCartAction, deleteCartItemAction, updateCartItemAction} from './actions';
import {ProductModel} from '../../models/product.model';

export const useCart = () => {
    const dispatch = useDispatch();
    const items = useSelector<RootStore, CartItemModel[]>(state => state.cart.current.items);
    const addItem = useCallback((product: ProductModel, quantity: number) => dispatch(addCartItemAction(product, quantity)), [dispatch]);
    const updateItem = useCallback((id: string, quantity: number, price: number) => dispatch(updateCartItemAction(id, quantity, price)), [dispatch]);
    const deleteItem = useCallback((id: string) => dispatch(deleteCartItemAction(id)), [dispatch]);
    const clear = useCallback(() => dispatch(clearCartAction()), [dispatch]);
    const total = useMemo(() => items.reduce((acc, item) => {
        return acc + (item ? (item.price * item.quantity) : 0);
    }, 0), [items]);

    return {items, addItem, updateItem, deleteItem, clear, total};
};
