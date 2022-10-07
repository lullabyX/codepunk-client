import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localforage from "localforage";

const pkgCache = localforage.createInstance({
  name: "pkgCache",
});

export const unpkgPathPlugin = (codeInput: string) => {
  return {
    name: "unpkg-path-plugin",
    async setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }
        if (args.path.includes("./") || args.path.includes("../")) {
          return {
            path: new URL(args.path, "https://unpkg.com" + args.resolveDir)
              .href,
            namespace: "a",
          };
        }

        return {
          path: "https://unpkg.com/" + args.path,
          namespace: "a",
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: codeInput,
          };
        }

        const cache = await pkgCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cache) {
          return cache;
        }
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL(request.responseURL).pathname,
        };
        await pkgCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
