import { terser } from "rollup-plugin-terser";
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [{
    file: pkg.main,
    format: 'cjs',
  }, ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
  ],
  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs(),
    babel({
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              node: '6',
            },
          }
        ]
      ],
      sourceMap: true,
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 2,
          }
        ]
      ],
      ignore: [
        /core-js/,
        /@babel\/runtime/
      ],
      runtimeHelpers: true,
    }),
    terser()
  ],
}
