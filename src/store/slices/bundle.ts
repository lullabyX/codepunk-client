import { createSlice } from "@reduxjs/toolkit";
import { bundleEndAction, bundleStartAction } from "../actions/bundle";
import { BundleState } from "../bundle";

const bundleInitialState: BundleState = {};

export const bundleSlice = createSlice({
  name: "bundle",
  initialState: bundleInitialState,
  reducers: {
    start: bundleStartAction,
    end: bundleEndAction,
  },
});

export const bundleActions = bundleSlice.actions;
