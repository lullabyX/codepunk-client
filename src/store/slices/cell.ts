import { createSlice } from "@reduxjs/toolkit";
import {
  deleteAction,
  fetchEndAction,
  fetchErrorAction,
  fetchStartAction,
  insertAfterAction,
  moveAction,
  postErrorAction,
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
    insertAfter: insertAfterAction,
    fetchStart: fetchStartAction,
    fetchEnd: fetchEndAction,
    fetchError: fetchErrorAction,
    postError: postErrorAction
  },
});

export const cellActions = cellSlice.actions;
