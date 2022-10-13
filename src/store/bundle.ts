import { Cell } from "./cell";

export type BundleState = {
  [key: Cell['id']]: {
    cellId: Cell["id"];
    loading: boolean;
    code: string;
    error: string | null;
  };
};
