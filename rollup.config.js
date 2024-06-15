import peerDepsExternal from "rollup-plugin-peer-deps-external";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import preserveDirectives from "rollup-preserve-directives";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import cssimport from "postcss-import";

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: "./dist/esm/bundle.js",
        format: "es",
        sourcemap: true,
      },
      {
        file: "./dist/bundle.js",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "dist/dts",
      }),
      postcss({
        plugins: [cssimport(), autoprefixer()],
      }),
      preserveDirectives(),
    ],
  },
  {
    input: "./dist/dts/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
