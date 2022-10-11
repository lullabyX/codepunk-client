import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAction,
  insertBeforeAction,
  moveAction,
  updateAction,
} from "../actions/cell";
import { Cell } from "../cell";

export interface CellState {
  loading: boolean;
  error: string | null;
  order: Cell["id"][];
  data: { [id: Cell["id"]]: Cell };
}

const cellInitialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

export const cellSlice = createSlice({
  name: "cell",
  initialState: cellInitialState,
  reducers: {
    update: updateAction,
    move: moveAction,
    delete: deleteAction,
    insertBefore: insertBeforeAction,
  },
});

export const cellActions = cellSlice.actions;
