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

import fs from 'fs-extra'
import path from 'path'
import matter from 'gray-matter'

import { ContentPost } from './ContentPost'

const cwd = process.cwd()

/**
 * Content crawler utility, which takes care of crawling directories for Markdown files and retrieves frontmatter data
 * @public
 * @constant
 * @class ContentCrawler
 * @property {String}  contentPath
 * @copyright Tom Bazarnik and the contributors
 * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a> 
 */
export const ContentCrawler = class ContentCrawler {
    /**
     * Creates an instance of ContentCrawler.
     * @param {String} [pathString='posts/'] - To-be-crawled content directory path string
     * @constructor
     * @return {ContentCrawler} The content crawler.
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
         * @type {String}
         * @public
         */
        this.contentPath = pathString
    }

    /**
     * Get the content directory path.
     * @method
     * @return {String} The content directory path.
     */
    get contentPath() {
        return this._contentPath
    }

    /**
     * Set the content directory path from Path object.
     * @method
     * @param {String} pathString - To-be-crawled content directory path string
     * @type {String}
     */
    set contentPath(pathString) {
        this._contentPath = path.join(cwd, pathString)
    }

    /**
     * Get directories from content directory path.
     * @method
     * @return {Array.<String>} Directory names
     * @example
     * // posts/
     * //  ├─── A
     * //  ├─── B
     * //  └─── C.md
     * const crawler = new ContentCrawler('posts/')
     * console.log(crawler.getDirectories()) // ["A", "B"]
     */
    getDirectories() {
        return fs.readdirSync(this._contentPath).filter(entry => {
            try {
                const lstat = fs.lstatSync(this._contentPath + entry)
                return lstat.isDirectory()
            } catch (_) {
                return false
            }
        })
    }

    /**
     * Get Markdown posts from content subfolder.
     * @method
     * @param {String} directory - Subfolder name
     * @return {Array.<String>} Posts inside the given subfolder
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
    markdownPostsFromDirectory(directory) {
        return fs.readdirSync(this._contentPath + directory)
            .filter(fileName => /\.md$/.test(fileName))
    }

    /**
     * Get posts and frontmatter data from content subfolder.
     * @method
     * @param {String} directory - Subfolder name
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
    postsFromDirectory(directory) {
        const posts = this.markdownPostsFromDirectory(directory).map(fileName => {
            const fileMd = fs.readFileSync(path.join(this._contentPath + directory, fileName), 'utf8')
            const { data, content } = matter(fileMd)
            const { title, date } = data
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
    
            if (dateA > dateB) return -1
            if (dateA < dateB) return 1
            return 0
        })
    
        posts.forEach(post => {
            post.html = post.html.replace(/^\t{3}/gm, '')
        })
    
        return posts
    }
}