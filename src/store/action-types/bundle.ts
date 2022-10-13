import {Cell} from "../cell";

export interface BundleStartAction {
  id: Cell['id'];
}

export interface BundleEndAction {
  id: Cell['id'];
  code: string | null;
  error: string | null;
}