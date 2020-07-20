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

import fs from 'fs-extra'
import path from 'path'
import prism from 'prismjs'
import marked from 'marked'
import matter from 'gray-matter'
import { format } from 'date-fns'
import readingTime from 'reading-time'

// Independant Prism components
import 'prismjs/components/prism-gdscript.min'
import 'prismjs/components/prism-graphql.min'
import 'prismjs/components/prism-json.min'
import 'prismjs/components/prism-toml.min'
import 'prismjs/components/prism-docker.min'
import 'prismjs/components/prism-rust.min'
import 'prismjs/components/prism-git.min'
import 'prismjs/components/prism-bash.min'
import 'prismjs/components/prism-python.min'
import 'prismjs/components/prism-diff.min'
import 'prismjs/components/prism-sql.min'
import 'prismjs/components/prism-yaml.min'
import 'prismjs/components/prism-haskell.min'
import 'prismjs/components/prism-stylus.min'

// TypeScript inherits from 'javascript'
import 'prismjs/components/prism-typescript.min'

// JSX and Markdown inherit from 'markup'
// TSX (JSX in TypeScript) inherits from 'jsx'
import 'prismjs/components/prism-markdown.min'
import 'prismjs/components/prism-jsx.min'
import 'prismjs/components/prism-tsx.min'

// CSS supersets (except Stylus) require 'css'
import 'prismjs/components/prism-scss.min'
import 'prismjs/components/prism-sass.min'

// C-like languages (C, C#, Go, D, Dart, Java, etc.) inherit from 'clike'
// C++ inherits from 'c'
import 'prismjs/components/prism-clike.min'
import 'prismjs/components/prism-c.min'
import 'prismjs/components/prism-csharp.min'
import 'prismjs/components/prism-dart.min'
import 'prismjs/components/prism-go.min'
import 'prismjs/components/prism-java.min'
import 'prismjs/components/prism-cpp.min'

// PHP inherits from 'markup-templating'
import 'prismjs/components/prism-markup-templating.min'
import 'prismjs/components/prism-php.min'

// JSDoc and JavaDoc inherit from 'javadoclike'
import 'prismjs/components/prism-javadoclike.min'

// Import Svelte Prism language extension community project
import 'prism-svelte'

const cwd = process.cwd()
const POSTS_DIR = path.join(cwd, 'posts/')
const EXCERPT_SEPARATOR = '<!-- more -->'
const renderer = new marked.Renderer()
const linkRenderer = renderer.link

renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text)

    if (href.indexOf('/') === 0) {
      // Do not open internal links on new tab
      return html
    } else if (href.indexOf('#') === 0) {
      // Handle hash links to internal elements
      const html = linkRenderer.call(renderer, 'javascript:;', title, text)
      return html.replace(/^<a /, `<a onclick="document.location.hash='${href.substr(1)}';" `)
    }

    return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ')
}

renderer.code = (code, language) => {
  const parser = prism.languages[language] || prism.languages.html
  const highlighted = prism.highlight(code, parser, language)
  return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`
}

renderer.paragraph = text => {
    const parsed = text.replace(/<code>\:[a-zA-Z0-9_]*?\:<\/code>{1}/g, (match, _) => {
        return `${match.replace(/:/g, '$x$')}`
    }).replace(/\:[a-zA-Z0-9_]*?\:/g, (match, _) => {
        return `<img emote src="emotes/${match.replace(/:/g, '')}.gif" />`
    }).replace(/\$x\$/g, ':')
    return `<p>` + parsed + `</p>`
}

marked.setOptions({ renderer })

const getDirectories = () => fs.readdirSync(POSTS_DIR).filter(entry => {
    try {
        const lstat = fs.lstatSync(POSTS_DIR + entry)
        return lstat.isDirectory()
    } catch (_) {
        return false
    }
})

const getPostsFromDirectory = directory => {
    const posts = fs.readdirSync(POSTS_DIR + directory)
    .filter(fileName => /\.md$/.test(fileName))
    .map(fileName => {
        const fileMd = fs.readFileSync(path.join(POSTS_DIR + directory, fileName), 'utf8')
        const { data, content: rawContent } = matter(fileMd)
        const { title, date } = data
        const slug = fileName.split('.')[0]
        let content = rawContent
        let excerpt = ''

        if (rawContent.indexOf(EXCERPT_SEPARATOR) !== -1) {
        const splittedContent = rawContent.split(EXCERPT_SEPARATOR)
        excerpt = splittedContent[0]
        content = splittedContent[1]
        }

        const html = marked(content)
        const readingStats = readingTime(content)
        const printReadingTime = readingStats.text
        const printDate = format(new Date(date), 'MMMM D, YYYY')

        return {
            title: title || slug,
            slug,
            html,
            date,
            excerpt,
            printDate,
            printReadingTime,
            lang: directory
        }
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

const directories = getDirectories()

let posts = []
directories.forEach(dir => {
    const langPosts = getPostsFromDirectory(dir)
    langPosts.forEach(post => {
        posts.push(post)
    })
})

export default posts
