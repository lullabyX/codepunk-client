import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        console.log("====================================");
        console.log("onResolve", args);
        console.log("====================================");
        return { path: args.path, namespace: "a" };
      });

      build.onLoad({filter: /.*/}, async (args: esbuild.OnLoadArgs) => {
        console.log('====================================');
        console.log("onLoad", args);
        console.log('====================================');
        if (args.path === 'index.js')
        {
          return {
            loader: 'jsx',
            contents: 
            `import message from './message';
             console.log(message)`
          }
        } else
        {
          return {
            loader: 'jsx',
            contents: 'export default "hi there"'
          }
        }
      })
    },
  };
};
