import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './productsSlice';

export const store = configureStore({
    reducer: {
        products: itemsReducer,
    },
});

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;