/*
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

// import fs from 'fs-extra'
import * as path from 'path'

const cwd: string = process.cwd()

/**
 * Emote crawler utility, which takes care of crawling emotes directory (<code>./emotes</code>)
 * @public
 * @class EmoteCrawler
 * @property {string}  emotesPath
 * @copyright Tom Bazarnik and the contributors
 * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
 */
export class EmoteCrawler {
	public emotesPath: string
	constructor(pathString = 'emotes/') {
		this.emotesPath = pathString
	}

	setEmotesPath(pathString: string) {
		this.emotesPath = path.join(cwd, pathString)
	}
}
