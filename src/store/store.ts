import { configureStore } from "@reduxjs/toolkit";
import { cellSlice } from "./slices/cell";

export const store = configureStore({
  reducer: {
    cell: cellSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
