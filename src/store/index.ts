import {combineReducers, createStore} from 'redux';
import {productReducer} from './product/reducer';

const reducers = combineReducers({
    product: productReducer,
});

const persisted = JSON.parse(localStorage.getItem('@store') || '{}');
export const store = createStore(reducers, persisted);

store.subscribe(() => {
    localStorage.setItem('@store', JSON.stringify(store.getState()));
});

export type RootStore = ReturnType<typeof store.getState>;