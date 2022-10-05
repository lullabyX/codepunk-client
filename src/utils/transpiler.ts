import * as esbuild from "esbuild-wasm";

// react strict mode runs useEffect twice, need to handle if strict mode is used
export const startService = async () => {
  await esbuild.initialize({
    worker: true,
    wasmURL: "/esbuild.wasm",
  });
};

export const bundler = async (
  rawCode: string
): Promise<esbuild.TransformResult> => {
  return esbuild.transform(rawCode, {
    target: "es2015",
    loader: "jsx",
  });
};
