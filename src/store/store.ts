import { configureStore } from "@reduxjs/toolkit";
import { cellSlice } from "./slices/cell";

const store = configureStore({
  reducer: {
    cell: cellSlice.reducer,
  },
});

export default store;
