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

import {format} from 'date-fns'
import {ContentParser} from './ContentParser'
import type {ISO_639_1} from './TranslationEntry'

const readingTime = require('reading-time')

/**
 * Default excerpt separator, this allows to separate summary and content from a Markdown file
 * @constant EXCERPT_SEPARATOR
 * @type {string}
 * @default <!-- more -->
*/
const EXCERPT_SEPARATOR = '<!-- more -->'

/**
 * General-purpose content post utility,
 * @public
 * @class ContentPost
 * @copyright Tom Bazarnik and the contributors
 * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
 */
export class ContentPost {
	title: string | undefined
	slug?: string
	html: string
	date: string
	printDate?: string
	printReadingTime?: string
	content: any
	excerpt?: string
	lang?: ISO_639_1
	/**
     * Creates an instance of ContentPost
     * @param {Object} postObject - The content post object
     * @param {string} postObject.title - Content post title
     * @param {string} postObject.slug - Content post sluggified title
     * @param {string} [postObject.content='Lorem ipsum dolor[...]'] - The actual post content
     * @param {string} [postObject.date=new Date().toDateString()] - Content post publish date as String
     * @constructor
     * @copyright Tom Bazarnik and the contributors
     * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
     */
	constructor(postObject: Record<string, unknown>) {
		this.html = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at eleifend risus. Vestibulum porta elit ipsum, nec congue erat lacinia nec. Proin sagittis orci id mattis mollis. Donec sollicitudin turpis sit amet condimentum lacinia. Proin volutpat, ligula nec ornare facilisis, libero ex porttitor odio, non luctus urna augue nec turpis. Donec erat tellus, suscipit quis mi eu, scelerisque faucibus mi. In hac habitasse platea dictumst. Cras elementum accumsan urna in semper. Suspendisse accumsan aliquet nisl tincidunt vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut convallis dolor at orci iaculis cursus. Nam ut facilisis enim. Vestibulum non euismod elit. Vivamus molestie congue sem, a aliquam justo ornare id.</p>
            <p>Sed commodo leo consectetur luctus ultrices. Duis vulputate lectus ut auctor convallis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi blandit massa et tincidunt lobortis. Etiam sed venenatis nulla. Sed vulputate nulla vel sodales accumsan. Donec sem purus, venenatis non pretium at, sollicitudin non augue. Nunc egestas massa accumsan tortor tristique, eu mollis arcu ornare. Mauris lacinia porta augue, quis ullamcorper justo molestie et. Praesent commodo porta nunc sit amet ornare.</p>
            <p>Curabitur eget est placerat, vehicula ante id, dignissim libero. Vivamus a massa facilisis, viverra mauris vel, congue nisi. Maecenas dignissim pretium metus sit amet viverra. Morbi rhoncus lacus odio, in pulvinar magna sodales a. Maecenas semper suscipit quam. Donec molestie fermentum auctor. Sed rutrum felis orci, eget ultrices neque vehicula quis. Nam non augue gravida, luctus metus non, blandit enim. Maecenas scelerisque, neque sed ultrices scelerisque, enim nisl posuere libero, sit amet dignissim nunc diam non leo. Integer varius velit et sem laoreet bibendum. Sed aliquam blandit justo, eu dictum urna. In et faucibus magna, id rhoncus nisi. Maecenas ullamcorper eleifend pellentesque. Duis fermentum sapien sit amet ullamcorper posuere. Ut ut nibh ipsum.</p>
            <p>Duis a malesuada risus. Vestibulum pellentesque augue non tortor suscipit gravida. Sed mattis sagittis cursus. Nullam mattis cursus iaculis. Vestibulum a diam vitae justo finibus vulputate. Phasellus a leo placerat, viverra turpis ut, rutrum risus. Quisque nec auctor turpis, nec scelerisque lorem.</p>
            <p>Integer et orci sit amet sapien suscipit tincidunt eu id ligula. Donec sit amet neque quis turpis imperdiet faucibus. Vestibulum consectetur turpis nisi, at porttitor velit ullamcorper eu. Nam a tortor ligula. Vestibulum molestie, dolor at mattis rutrum, arcu purus pharetra ipsum, at tincidunt sem sem eu dolor. Nunc tincidunt risus elit. Etiam et nisl nisl. Aliquam erat volutpat. Aenean malesuada euismod vestibulum. Fusce pretium nisl id ex luctus rhoncus. Nam egestas nisi a ante malesuada, condimentum tristique mi placerat. Suspendisse eu libero at eros tincidunt viverra a vitae odio. Donec tellus eros, pretium eu ex a, tempor posuere tellus. Nulla ut eros in felis tincidunt sodales in ac elit. Phasellus sed egestas elit. Proin pellentesque faucibus lorem, non condimentum arcu consequat id.</p>`
		this.date = new Date().toDateString()
		for (const [key, value] of Object.entries(postObject))
			(this as any)[key] = value
		/**
         * Human-readable content post publish date, parsed via <code>date-fns</code>
         * @type {string}
         * @public
         * @copyright Tom Bazarnik and the contributors
         * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
         */
		this.printDate = format(new Date(this.date), 'MMMM D, YYYY')
		/**
         * Estimated content reading time <code>reading-time</code>
         * @type {string}
         * @public
         * @copyright Tom Bazarnik and the contributors
         * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
         */
		this.printReadingTime = readingTime(this.content).text

		let content = this.content
		let excerpt = ''

		if (this.content.includes(EXCERPT_SEPARATOR)) {
			const splittedContent = this.content.split(EXCERPT_SEPARATOR)
			excerpt = splittedContent[0]
			content = splittedContent[1]
		}

		this.content = content

		/**
         * Excerpt, aka the post summary, stripped from original content, using the <code><!-- more --></code> separator
         * @type {string}
         * @public
         * @copyright Tom Bazarnik and the contributors
         * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
         */
		this.excerpt = excerpt

		const parser = new ContentParser()

		/**
         * Parsed post content, as HTML, using the provided content without the excerpt
         * @type {string}
         * @public
         * @copyright Tom Bazarnik and the contributors
         * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
         */
		this.html = parser.parse(this.content)
	}
}
