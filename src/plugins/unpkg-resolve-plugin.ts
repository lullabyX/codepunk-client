import * as esbuild from "esbuild-wasm";

export const unpkgResolvePlugin = () => {
  return {
    name: "unpkg-resolve-plugin",
    async setup(build: esbuild.PluginBuild) {
      build.onResolve(
        { filter: /^index\.js$/ },
        async (args: esbuild.OnResolveArgs) => {
          return { path: args.path, namespace: "a" };
        }
      );

      build.onResolve(
        { filter: /^\.+\/*/ },
        async (args: esbuild.OnResolveArgs) => {
          return {
            path: new URL(args.path, "https://unpkg.com" + args.resolveDir)
              .href,
            namespace: "a",
          };
        }
      );

      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        return {
          path: "https://unpkg.com/" + args.path,
          namespace: "a",
        };
      });
    },
  };
};
