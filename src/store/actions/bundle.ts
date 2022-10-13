import { PayloadAction } from "@reduxjs/toolkit";
import { BundleEndAction, BundleStartAction } from "../action-types/bundle";
import { BundleState } from "../bundle";

export const bundleStartAction = (
  state: BundleState,
  action: PayloadAction<BundleStartAction>
) => {
  const id = action.payload.id;
  state[id] = {
    cellId: id,
    loading: false,
    code: "",
    error: null,
  };
};

export const bundleEndAction = (
  state: BundleState,
  action: PayloadAction<BundleEndAction>
) => {
  const id = action.payload.id;
  state[id] = {
    cellId: id,
    loading: false,
    code: action.payload.code ? action.payload.code : "",
    error: action.payload.error,
  };
};
