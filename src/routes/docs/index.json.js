/**
 * @license GPL-3.0
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

import {SourceCodeCrawler} from '../../models/SourceCodeCrawler'

const sourceCodeCrawler = new SourceCodeCrawler('src/')

export async function get(_request, response) {
	response.writeHead(200, {
		'Content-Type': 'application/json'
    })
    
    const docs = await sourceCodeCrawler.crawl(['.ts', '.svelte'])
    const contents = JSON.stringify(docs.map(file => file))

	response.end(contents)
}
