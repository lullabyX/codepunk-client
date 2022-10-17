import { Dispatch, Middleware } from "@reduxjs/toolkit";
import { postCells } from "../action-creators/cells";
import { Action } from "../action-types";
import { Cell } from "../cell";
import { cellActions } from "../slices/cell";
import { RootState } from "../store";

let timer: ReturnType<typeof setTimeout>;
export const saveCells: Middleware<{}, RootState> =
  (storeApi) => (next: Dispatch<Action>) => (action: Action) => {
    if (
      [
        cellActions.move.type,
        cellActions.update.type,
        cellActions.insertAfter.type,
        cellActions.delete.type,
      ].includes(action.type)
    ) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        const { order, data } = storeApi.getState().cell;
        const cells: Cell[] = order.map((cellId) => data[cellId]);
        postCells(cells)(storeApi.dispatch);
      }, 500);
    }
    return next(action);
  };
