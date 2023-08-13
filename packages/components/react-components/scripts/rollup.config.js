
const clear = require('rollup-plugin-clear');
const autoAdd = require('rollup-plugin-auto-add').default;
const typescript = require('rollup-plugin-typescript2');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const peerDepExternal = require('rollup-plugin-peer-deps-external');
const alias = require('@rollup/plugin-alias');
const fileSize = require('rollup-plugin-filesize');
const postcss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');
const path = require('path');
const multiInput = require('rollup-plugin-multi-input').default
// rollup svelte


const pkg = require('../package.json');

const banner = `/**
* @author: yunai
* @license: ${pkg.license}
* @version: ${pkg.version}
*/
`


module.exports = [
    // esm
    {
        input: 'src/**/*',
        external: Object.keys(pkg.peerDependencies || {}),
        plugins: [
            clear({ targets: 'esm' }),
            multiInput(),
            autoAdd({
                include: [/src\/(((?!\/).)+?)\/index\.tsx/gi],
            }),
            typescript({
                tsconfig: path.resolve(__dirname, './tsconfig.build.json')
            }),
            peerDepExternal(),
            resolve(),
            commonjs(),
            fileSize(),
            postcss({
                minimize: true,
                sourceMap: false,
                extensions: ['.less', '.scss'],
                use:[['less']]
            }),
            alias({
                entries: {
                    '@': path.resolve(__dirname, '../src'),
                }
            }),
        ],
        output: [{
            dir: 'esm',
            format: 'esm',
            sourceMap: true
        }]
    },
    // umd
    {
        input: 'src/index.tsx',
        external: Object.keys(pkg.peerDependencies || {}),

        output: [
            {
                banner,
                dir: 'umd',
                format: 'umd',
                exports: 'named',
                name: 'react-components',
                global: {
                    react: 'React'
                }
            }
        ],
        plugins: [
            clear({ targets: 'umd' }),
            autoAdd({
                include: [/src\/(((?!\/).)+?)\/index\.tsx/gi],
            }),
            typescript({
                tsconfig: path.resolve(__dirname, './tsconfig.umd.json')
            }),
            peerDepExternal(),
            resolve(),
            commonjs(),
            fileSize(),
            postcss({
                minimize: true,
                sourceMap: false,
                extensions: ['.less', '.scss'],
                use:[['less']]
            }),
            alias({
                entries: {
                    '@': path.resolve(__dirname, '../src'),
                }
            }),
            terser()
        ]
    }
]