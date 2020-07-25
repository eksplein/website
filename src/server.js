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

import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'

import {compileDocma} from './hmr'

const {PORT, NODE_ENV} = process.env
const dev = NODE_ENV === 'development'

const SERVE_STATIC = sirv('static', {dev})
const SERVE_OUTPUT = sirv('__eksplein__', {dev})

polka() // You can also use Express
	.use(
		compression({threshold: 0}),
		SERVE_STATIC,
		SERVE_OUTPUT,
		sapper.middleware()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err)
		if (dev) compileDocma()
	})
