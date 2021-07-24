import {createReducer} from 'deox';
import {v4 as uuidv4} from 'uuid';
import {ExactActionCreator} from 'deox/dist/create-action-creator';
import {BaseModel} from '../models/base.model';

type StoreType<Model> = {
    list: Model[];
}

type Params<Model> = {
    initialState: StoreType<Model>;
    addAction: ExactActionCreator<string, (model: Model) => { type: string, payload: { model: Model } }>;
    updateAction: ExactActionCreator<string, (id: string, model: Partial<Model>) => { type: string, payload: { id: string; model: Partial<Model> } }>;
    deleteAction: ExactActionCreator<string, (id: string) => { type: string, payload: { id: string } }>;
};

export const listReducer = <Model extends BaseModel>(params: Params<Model>) => {
    const {initialState, addAction, deleteAction, updateAction} = params;

    return createReducer(initialState, handle => [
        handle(addAction, (state, {payload: {model}}) => {
            model = {...model, id: uuidv4()};
            return {...state, list: [...state.list, model]};
        }),
        handle(updateAction, (state, {payload: {model, id}}) => {
            const foundModel = state.list.find(item => item.id === id);
            if (foundModel) {
                return {...state, list: [...state.list.filter(item => item.id !== id), {...foundModel, ...model}]};
            }
            return state;
        }),
        handle(deleteAction, (state, {payload: {id}}) => {
            const foundModel = state.list.find(item => item.id === id);
            if (foundModel) {
                return {
                    ...state,
                    list: [...state.list.filter(item => item.id !== id), {
                        ...foundModel,
                        deleted_at: new Date().toISOString(),
                    }],
                };
            }
            return state;
        }),
    ]);
};
