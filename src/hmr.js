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
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {spawn} from 'child_process'
import {platform} from 'os'

const options = {}
if (platform() == 'win32')
	options.shell = true

export const compileExcalidraw = async () => {
	const startTime = new Date()
	const _ = await spawn('npm run excalidraw', [], options)
	_.on('close', code => {
		const exitTime = new Date()
		if (String(code) === '0')
			console.log('\u001B[32m%s\u001B[0m \u001B[90m%s\u001B[0m', '✔ excalidraw', `(${exitTime.getTime() - startTime.getTime()}ms)`)
		else
			console.log('\u001B[31m%s\u001B[0m \u001B[90m%s\u001B[0m', '✗ excalidraw', `(${exitTime.getTime() - startTime.getTime()}ms)`)
	})
	return true
}

export const compileDocma = async () => {
	const startTime = new Date()
	const _ = await spawn('npm run docma:build-only', [], options)
	_.on('close', code => {
		const exitTime = new Date()
		if (String(code) === '0')
			console.log('\u001B[32m%s\u001B[0m \u001B[90m%s\u001B[0m', '✔ docma', `(${exitTime.getTime() - startTime.getTime()}ms)`)
		else
			console.log('\u001B[31m%s\u001B[0m \u001B[90m%s\u001B[0m', '✗ docma', `(${exitTime.getTime() - startTime.getTime()}ms)`)
	})
	_.on('error', data => {
		console.log('\u001B[31m%s\u001B[0m', '-Error encountered with Docma custom script-')
		console.log(data)
	})
	return true
}

export const compileTypeScript = async () => {
	console.log('Some \u001B[34m%s\u001B[0m file changed, retranspiling...', 'TypeScript')
	const startTime = new Date()
	const _ = await spawn('npm run tsc', [], options)
	_.on('close', code => {
		const exitTime = new Date()
		if (String(code) === '0')
			console.log('\u001B[32m%s\u001B[0m \u001B[90m%s\u001B[0m', '✔ typescript', `(${exitTime.getTime() - startTime.getTime()}ms)`)
		else
			console.log('\u001B[31m%s\u001B[0m \u001B[90m%s\u001B[0m', '✗ typescript', `(${exitTime.getTime() - startTime.getTime()}ms)`)
	})
	_.on('error', data => {
		console.log('\u001B[31m%s\u001B[0m', '-Error encountered with TypeScript custom script-')
		console.log(data)
	})
	return true
}
