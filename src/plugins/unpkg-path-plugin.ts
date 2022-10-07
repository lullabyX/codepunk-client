import axios from "axios";
import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = (codeInput: string) => {
  return {
    name: "unpkg-path-plugin",
    async setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        // console.log("====================================");
        // console.log("onResolve", args);
        // console.log("====================================");
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
        // console.log("====================================");
        // console.log("onLoad", args);
        // console.log("====================================");
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: codeInput,
          };
        }
        const { data, request } = await axios.get(args.path);

        return {
          loader: "jsx",
          contents: data,
          resolveDir: new URL(request.responseURL).pathname,
        };
      });
    },
  };
};
