import * as esbuild from "esbuild-wasm";
import {unpkgPathPlugin} from "../plugins/unpkg-path-plugin";

// react strict mode runs useEffect twice, need to handle if strict mode is used
export const startService = async () => {
  await esbuild.initialize({
    worker: true,
    wasmURL: "/esbuild.wasm",
  });
};

export const bundler = async (
): Promise<esbuild.BuildResult> => {
  return esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin()]
  });
};
