import { PayloadAction } from "@reduxjs/toolkit";
import {
  DeleteAction,
  FetchEndAction,
  FetchErrorAction,
  FetchStartAction,
  InsertAfterAction,
  MoveAction,
  PostErrorAction,
  UpdateAction,
} from "../action-types/cell";
import { CellState } from "../slices/cell";

export const updateAction = (
  state: CellState,
  action: PayloadAction<UpdateAction>
) => {
  state.data[action.payload.id].content = action.payload.content;
};

export const deleteAction = (
  state: CellState,
  action: PayloadAction<DeleteAction>
) => {
  delete state.data[action.payload.id];
  const index = state.order.findIndex((id) => id === action.payload.id);
  if (index > -1) {
    state.order.splice(index, 1);
  }
};

export const moveAction = (
  state: CellState,
  action: PayloadAction<MoveAction>
) => {
  const index = state.order.findIndex((id) => id === action.payload.id);
  const updatedIndex =
    action.payload.direction === "up" ? index - 1 : index + 1;

  if (updatedIndex < 0 || updatedIndex > state.order.length - 1) {
    return state;
  } else {
    [state.order[updatedIndex], state.order[index]] = [
      state.order[index],
      state.order[updatedIndex],
    ];
  }
};

export const insertAfterAction = (
  state: CellState,
  action: PayloadAction<InsertAfterAction>
) => {
  const newCellId = Math.random().toString(32).substring(2, 8);
  if (!action.payload.id) {
    state.order.unshift(newCellId);
  } else {
    const index = state.order.findIndex((id) => id === action.payload.id);
    state.order.splice(index + 1, 0, newCellId);
  }
  state.data[newCellId] = {
    id: newCellId,
    type: action.payload.type,
    content: action.payload.type === "text" ? "Double-Click to Edit" : "",
  };
};

export const fetchStartAction = (
  state: CellState,
  _: PayloadAction<FetchStartAction>
) => {
  state.loading = true;
  state.error = null;
};

export const fetchEndAction = (
  state: CellState,
  action: PayloadAction<FetchEndAction>
) => {
  state.loading = false;
  state.order = action.payload.cells.map((cell) => cell.id);
  state.data = action.payload.cells.reduce((preVal, cell) => {
    preVal[cell.id] = cell;
    return preVal;
  }, {} as CellState["data"]);
};

export const fetchErrorAction = (
  state: CellState,
  action: PayloadAction<FetchErrorAction>
) => {
  state.loading = false;
  state.error = action.payload.error;
};

export const postErrorAction = (
  state: CellState,
  action: PayloadAction<PostErrorAction>
) => {
  state.error = action.payload.error;
};
