import { PayloadAction } from "@reduxjs/toolkit";
import { BundleEndAction, BundleStartAction } from "../action-types/bundle";
import { BundleState } from "../bundle";

export const bundleStartAction = (
  state: BundleState,
  action: PayloadAction<BundleStartAction>
) => {
  const id = action.payload.id;
  state[id].cellId = id;
  state[id].loading = true;
  state[id].code = "";
  state[id].error = null;
};

export const bundleEndAction = (
  state: BundleState,
  action: PayloadAction<BundleEndAction>
) => {
  const id = action.payload.id;
  state[id].code = action.payload.code ? action.payload.code : "";
  state[id].error = action.payload.error;
};
