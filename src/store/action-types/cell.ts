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
  type: Cell['type']
}

export interface DeleteAction {
  id: Cell["id"];
}

export type CellActions =
  | UpdateAction
  | MoveAction
  | InsertAfterAction
  | DeleteAction;
