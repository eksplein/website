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

import * as sapper from '@sapper/server'
import compression from 'compression'
import polka from 'polka'
import sirv from 'sirv'

const PORT = process.env.PORT
const mode = process.env.NODE_ENV
const dev: boolean = mode === 'development'

const app = polka()

app.use(
	compression({threshold: 0}),
	sirv('static', {dev}),
	sapper.middleware()
).listen(PORT, (err: any) => {
	if (err) console.log('error', err)
})
