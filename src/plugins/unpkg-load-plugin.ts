import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localforage from "localforage";

const pkgCache = localforage.createInstance({
  name: "pkgCache",
});

export const unpkgLoadPlugin = (codeInput: string) => {
  return {
    name: "unpkg-load-plugin",
    async setup(build: esbuild.PluginBuild) {
      build.onLoad(
        { filter: /(^index)\.js$/ },
        async (args: esbuild.OnLoadArgs) => {
          return {
            loader: "jsx",
            contents: codeInput,
          };
        }
      );
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        const cache = await pkgCache.getItem<esbuild.OnLoadResult>(args.path);

        if (cache) {
          console.log(cache);
          return cache;
        }
      });
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
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
