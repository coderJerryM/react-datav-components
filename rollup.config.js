import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import path from 'path'
import postcss from 'rollup-plugin-postcss'
import esbuild, { minify } from 'rollup-plugin-esbuild'
import babel from '@rollup/plugin-babel'

const inputPath = path.resolve(__dirname, './src/index.ts')

const extensions = ['.js', '.ts']

export default [
  {
    input: inputPath,
    output: [
      {
      file: 'dist/bundle.js',
      format: 'cjs',
    },
    {
      file: 'dist/bundle-es.js',
      format: 'es',
    },
    ],
    plugins: [
      resolve(),
      commonjs(),
      postcss({
      plugins:[]
    }),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
        babelHelpers: 'bundled',
        extensions
      }),
       esbuild({
      // All options are optional
      include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
      sourceMap: false, // by default inferred from rollup's `output.sourcemap` option
      minify: process.env.NODE_ENV === 'production',
      target: 'esnext', // default, or 'es20XX', 'esnext'
      jsx: 'transform', // default, or 'preserve'
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      // Like @rollup/plugin-replace
      define: {
        __VERSION__: '"x.y.z"',
      },
      tsconfig: 'tsconfig.json', // default
      // Add extra loaders
      loaders: {
        // Add .json files support
        // require @rollup/plugin-commonjs
        '.json': 'json',
        // Enable JSX in .js files too
        '.js': 'jsx',
      },
       }),
       minify()
      // terser()
    ],
    external: ['react','react-dom'] 
  },

]
