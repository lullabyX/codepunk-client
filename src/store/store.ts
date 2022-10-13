import { configureStore } from "@reduxjs/toolkit";
import { bundleSlice } from "./slices/bundle";
import { cellSlice } from "./slices/cell";

export const store = configureStore({
  reducer: {
    cell: cellSlice.reducer,
    bundle: bundleSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
