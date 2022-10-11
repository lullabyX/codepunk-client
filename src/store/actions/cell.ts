import { PayloadAction } from "@reduxjs/toolkit";
import {
  DeleteAction,
  InsertBeforeAction,
  MoveAction,
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

export const insertBeforeAction = (
  state: CellState,
  action: PayloadAction<InsertBeforeAction>
) => {
  const newCellId = Math.random().toString(64).substring(2, 8);
  if (!action.payload.id) {
    state.order.push(newCellId);
  } else {
    const index = state.order.findIndex((id) => id === action.payload.id);
    state.order.splice(index, 0, newCellId);
  }
  state.data[newCellId] = {id: newCellId, ...action.payload.cell};
};
