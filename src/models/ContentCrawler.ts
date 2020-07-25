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

import * as fs from 'fs-extra'
import * as path from 'path'
import * as matter from 'gray-matter'

import {ContentPost} from './ContentPost'

const cwd: string = process.cwd()

/**
 * Content crawler utility, which takes care of crawling directories for Markdown files and retrieves frontmatter data
 * @public
 * @constant
 * @class ContentCrawler
 * @property {string}  contentPath
 * @copyright Tom Bazarnik and the contributors
 * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
 */
export class ContentCrawler {
	contentPath: string
	/**
     * Creates an instance of ContentCrawler.
     * @param {string} [pathString='posts/'] - To-be-crawled content directory path string
     * @constructor
     * @description
     * <strong>Source</strong>
     * ```
     * constructor(pathString = 'posts/') {
     *   this.contentPath = path.join(process.cwd(), pathString)
     * }
     * ```
     */
	constructor(pathString = 'posts/') {
		/**
         * To-be-crawled content directory path
         * @type {string}
         * @public
         */
		this.contentPath = pathString
	}

	/**
     * Set the content directory path from Path object.
     * @method
     * @param {string} pathString - To-be-crawled content directory path string
     */
	setContentPath(pathString: string) {
		this.contentPath = path.join(cwd, pathString)
	}

	/**
     * Get directories from content directory path.
     * @method
     * @return {Array.<string>} Directory names
     * @example
     * // posts/
     * //  ├─── A
     * //  ├─── B
     * //  └─── C.md
     * const crawler = new ContentCrawler('posts/')
     * console.log(crawler.getDirectories()) // ["A", "B"]
     */
	getDirectories(): string[] {
		return fs.readdirSync(this.contentPath).filter(entry => {
			try {
				const lstat = fs.lstatSync(this.contentPath + entry)
				return lstat.isDirectory()
			} catch {
				return false
			}
		})
	}

	/**
     * Get Markdown posts from content subfolder.
     * @method
     * @param {string} directory - Subfolder name
     * @return {Array.<string>} Posts inside the given subfolder
     * @example
     * // posts/
     * //  ├─── A
     * //  │   ├─── B
     * //  │   ├─── C.md
     * //  │   └─── D.md
     * //  └─── E
     * const crawler = new ContentCrawler('posts/')
     * console.log(crawler.markdownPostsFromDirectory('A')) // ["C.md", "D.md"]
     */
	markdownPostsFromDirectory(directory): string[] {
		return fs.readdirSync(this.contentPath + directory)
			.filter(fileName => fileName.endsWith('.md'))
	}

	/**
     * Get posts and frontmatter data from content subfolder.
     * @method
     * @param {string} directory - Subfolder name
     * @return {Array.<ContentPost>} Posts inside the given subfolder
     * @example
     * // posts/
     * //  ├─── A
     * //  │   ├─── B
     * //  │   ├─── C.md
     * //  │   └─── D.md
     * //  └─── E
     * const crawler = new ContentCrawler('posts/')
     * console.log(crawler.postsFromDirectory('A')) // ["C.md", "D.md"]
     */
	postsFromDirectory(directory): ContentPost[] {
		const posts = this.markdownPostsFromDirectory(directory).map(fileName => {
			const fileMd = fs.readFileSync(path.join(this.contentPath + directory, fileName), 'utf8')
			const {data, content} = matter(fileMd)
			const {title, date} = data
			const slug = fileName.split('.')[0]

			return new ContentPost({
				title: title || slug,
				slug,
				content,
				date,
				lang: directory
			})
		})

		posts.sort((a, b) => {
			const dateA = new Date(a.date)
			const dateB = new Date(b.date)

			if (dateA > dateB)
				return -1
			if (dateA < dateB)
				return 1
			return 0
		})

		posts.forEach(post => {
			post.html = post.html.replace(/^\t{3}/gm, '')
		})

		return posts
	}
}
