import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { saveCells } from "./middleware/save-cells";
import { bundleSlice } from "./slices/bundle";
import { cellSlice } from "./slices/cell";

const rootReducer = combineReducers({
  cell: cellSlice.reducer,
  bundle: bundleSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(saveCells),
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
