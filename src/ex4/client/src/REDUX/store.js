import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import itemsReducer from './reducers/items-reducer'

export const store = configureStore({
    reducer: itemsReducer,
    middleware: [thunkMiddleware],
    preloadedState: {}
});