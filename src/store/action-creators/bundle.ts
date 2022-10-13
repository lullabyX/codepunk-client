import { Dispatch } from "@reduxjs/toolkit";
import { bundler } from "../../bundler/bundler";
import { Cell } from "../cell";
import { bundleActions } from "../slices/bundle";

export const bundleProcessInit = (id: Cell["id"], rawCode: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(bundleActions.start({ id }));

    try {
      const result = await bundler(rawCode);

      dispatch(
        bundleActions.end({
          id,
          code: result.outputFiles![0].text,
          error: null,
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          bundleActions.end({
            id,
            code: null,
            error: error.message,
          })
        );
      }
    }
  };
};
