/**
 * EKSPLEIN (/ɛkˈspleɪn/) is a simple and stupid glossary-like blog
 * in which things are explained
 * Copyright (C) 2020  Tom Bazarnik and the contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import babel from '@rollup/plugin-babel'
import {terser} from 'rollup-plugin-terser'
import config from 'sapper/config/rollup'
import marked from 'marked'
import svg from 'rollup-plugin-svg-import'
import pkg from './package.json'
import json from '@rollup/plugin-json'
import sveltePreprocess from 'svelte-preprocess'

const preprocess = sveltePreprocess({
	typescript: true,
	scss: true
})

const mode = process.env.NODE_ENV
const dev = mode === 'development'

const onwarn = () => (warning, onwarn) => {
	if (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message))
		return true
	if (warning.message === 'Unused CSS selector')
		return true
	return onwarn(warning)
}

const markdown = () => ({
	transform(md, id) {
		if (!/\.md$/.test(id)) return null
		const data = marked(md)
		return {
			code: `export default ${JSON.stringify(data.toString())};`,
			map: {mappings: ''}
		}
	}
})

const client = {
	input: config.client.input(),
	output: config.client.output(),
	plugins: [
		replace({
			'process.browser': true,
			'process.env.NODE_ENV': JSON.stringify(mode)
		}),
		json(),
		svg({stringify: true}),
		svelte({
			dev,
			preprocess,
			hydratable: true,
			emitCss: true
		}),
		resolve(),
		commonjs(),
		babel({
			extensions: ['.js', '.mjs', '.html', '.svelte', '.json'],
			babelHelpers: 'runtime',
			exclude: ['node_modules/@babel/**'],
			presets: [
				['@babel/preset-env', {
					targets: '> 0.25%, not dead'
				}]
			],
			plugins: [
				'@babel/plugin-syntax-dynamic-import',
				['@babel/plugin-transform-runtime', {
					useESModules: true
				}]
			]
		}),

		!dev && terser({
			module: true
		})
	],
	preserveEntrySignatures: false,
	onwarn
}

const server = {
	input: config.server.input(),
	output: config.server.output(),
	plugins: [
		replace({
			'process.browser': false,
			'process.env.NODE_ENV': JSON.stringify(mode)
		}),
		json(),
		svg({stringify: true}),
		svelte({
			preprocess,
			generate: 'ssr',
			dev
		}),
		resolve(),
		commonjs(),
		markdown()
	],
	external: Object.keys(pkg.dependencies).concat(
		require('module').builtinModules || Object.keys(process.binding('natives'))
	),

	onwarn
}

const serviceworker = {
	input: config.serviceworker.input(),
	output: config.serviceworker.output(),
	plugins: [
		resolve(),
		replace({
			'process.browser': true,
			'process.env.NODE_ENV': JSON.stringify(mode)
		}),
		commonjs(),
		!dev && terser()
	],
	onwarn
}

export {client, server, serviceworker}
