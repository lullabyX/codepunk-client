import * as esbuild from "esbuild-wasm";
import { unpkgLoadPlugin } from "./plugins/unpkg-load-plugin";
import { unpkgResolvePlugin } from "./plugins/unpkg-resolve-plugin";

let esbuildIsInitialized = false;

export const bundler = async (
  codeInput: string
): Promise<esbuild.BuildResult> => {
  
  if (!esbuildIsInitialized) {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm",
    });
    esbuildIsInitialized = true;
  }

  return esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgResolvePlugin(), unpkgLoadPlugin(codeInput)],
    define: { "process.env.NODE_ENV": '"production"', global: "window" },
  });
};
