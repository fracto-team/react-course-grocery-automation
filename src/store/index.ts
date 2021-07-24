import {combineReducers, createStore} from 'redux';
import {productReducer} from './product/reducer';
import {categoryReducer} from './category/reducer';
import {cartReducer} from './cart/reducer';

const reducers = combineReducers({
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
});

const persisted = JSON.parse(localStorage.getItem('@store') || '{}');
export const store = createStore(reducers, persisted);

store.subscribe(() => {
    localStorage.setItem('@store', JSON.stringify(store.getState()));
});

export type RootStore = ReturnType<typeof store.getState>;
