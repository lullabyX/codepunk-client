import { PayloadAction } from "@reduxjs/toolkit";
import { Cell, CellMoveDirection } from "../cell";

export interface UpdateAction {
  id: Cell["id"];
  content: Cell["content"];
}

export interface MoveAction {
  id: Cell["id"];
  direction: CellMoveDirection;
}

export interface InsertAfterAction {
  id: Cell["id"] | null;
  type: Cell["type"];
}

export interface DeleteAction {
  id: Cell["id"];
}

export interface FetchStartAction {}

export interface FetchEndAction {
  cells: Cell[];
}

export interface FetchErrorAction {
  error: string;
}

export interface PostErrorAction {
  error: string
}

export type CellActions =
  | PayloadAction<UpdateAction>
  | PayloadAction<MoveAction>
  | PayloadAction<InsertAfterAction>
  | PayloadAction<DeleteAction>
  | PayloadAction<FetchStartAction>
  | PayloadAction<FetchEndAction>
  | PayloadAction<FetchErrorAction>
  | PayloadAction<PostErrorAction>;
