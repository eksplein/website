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

import prism from 'prismjs'
import marked from 'marked'

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

/** 
 * Default Marked Renderer, which already takes care of parsing code blocks with Prism and emotes as <code>img</code> tags
 * @constant DefaultRenderer
 * @type {Renderer}
*/
const DefaultRenderer = new marked.Renderer()
const linkRenderer = DefaultRenderer.link

DefaultRenderer.link = (href, title, text) => {
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

DefaultRenderer.code = (code, language) => {
  const parser = prism.languages[language] || prism.languages.html
  const highlighted = prism.highlight(code, parser, language)
  return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`
}

DefaultRenderer.paragraph = text => {
    const parsed = text.replace(/<code>\:[a-zA-Z0-9_]*?\:<\/code>{1}/g, (match, _) => {
        return `${match.replace(/:/g, '$x$')}`
    }).replace(/\:[a-zA-Z0-9_]*?\:/g, (match, _) => {
        return `<img emote src="emotes/${match.replace(/:/g, '')}.gif" />`
    }).replace(/\$x\$/g, ':')
    return `<p>` + parsed + `</p>`
}


/**
 * Content parser utility, which takes care of parsing Markdown as HTML, using a customizable Marked renderer.
 * @public
 * @constant
 * @class ContentParser
 * @property {Renderer}  customRenderer
 * @copyright Tom Bazarnik and the contributors
 * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a> 
 */
export const ContentParser = class ContentParser {
    /**
     * Creates an instance of ContentParser.
     * @param {Renderer} [renderer=DefaultRenderer] - Marked renderer object that will parse the content. Defaults to DefaultRenderer constant if none provided.
     * @constructor
     * @return {ContentParser} The content parser.
     */
    constructor(renderer) {
        this.renderer = DefaultRenderer
        if (renderer) 
            this.renderer = renderer
    }

    /**
     * Set the Marked renderer for the content parser
     * @method
     * @param {Renderer} customRenderer - Marked renderer 
     * @type {Renderer}
     */
    set renderer(customRenderer) {
        this._renderer = customRenderer
    }

    /**
     * Helper method that generates a blank Marked renderer
     * @method
     * @return {Renderer}
     */
    generateMarkedRenderer() {
        return new marked.Renderer()
    }

    /**
     * Parse the content with the ContentParser object renderer
     * @method
     * @param {String} content - the original Markdown content
     * @return {String}
     */
    parse(content) {
        marked.setOptions({ renderer: this._renderer })
        return marked(content)
    }
}