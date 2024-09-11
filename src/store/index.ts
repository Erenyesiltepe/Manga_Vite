import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import slidesReducer, { SlidesState } from './slidesSlice';
import categoriesReducer, { CategoriesState } from './categoriesSlice';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const rootReducer = combineReducers({
    slides: slidesReducer,
    categories: categoriesReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export type RootState = {
    slides: SlidesState;
    categories: CategoriesState;
};
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
