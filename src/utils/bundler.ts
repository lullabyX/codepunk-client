import * as esbuild from "esbuild-wasm";
import { unpkgLoadPlugin } from "../plugins/unpkg-load-plugin";
import { unpkgResolvePlugin } from "../plugins/unpkg-resolve-plugin";

// react strict mode runs useEffect twice, need to handle if strict mode is used
export const startService = async () => {
  await esbuild.initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm",
  });
};

export const bundler = async (
  codeInput: string
): Promise<esbuild.BuildResult> => {
  return esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgResolvePlugin(), unpkgLoadPlugin(codeInput)],
    define: { "process.env.NODE_ENV": '"production"', global: "window" },
  });
};
