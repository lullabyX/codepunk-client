import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { CellActions } from "../action-types/cell";
import { Cell } from "../cell";
import { cellActions } from "../slices/cell";

interface FetchGETResponse {
  data: { data: Cell[]; response: string };
}

export const fetchCells = () => {
  return async (dispatch: Dispatch<CellActions>) => {
    dispatch(cellActions.fetchStart({}));

    try {
      const { data }: FetchGETResponse = await axios.get(
        window.location.href + "cells"
      );

      dispatch(cellActions.fetchEnd({ cells: data.data }));
    } catch (error) {
      dispatch(
        cellActions.fetchError({
          error:
            error instanceof Error
              ? error.message
              : "something went wrong fetching cells",
        })
      );
    }
  };
};

export const postCells = (cells: Cell[]) => {
  return async (dispatch: Dispatch<CellActions>) => {
    try {
      const { data }: { data: { response: string } } = await axios.post(
        window.location.href + "cells",
        {
          cells,
        }
      );
      console.log(data);
    } catch (error) {
      dispatch(
        cellActions.postError({
          error:
            error instanceof Error
              ? error.message
              : "Something went wrong saving cells",
        })
      );
    }
  };
};
