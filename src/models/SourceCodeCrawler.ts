import * as fs from 'fs-extra'
import * as path from 'path'

import {SourceCodeFile} from './AST/SourceCodeFile'
import {TSESTree} from '@typescript-eslint/types'
import {SourceCodeFileJSDocTree} from './AST/SourceCodeFileJSDocTree'

// This is the parser which will be used for JSDoc comments
const CommentParser = require('parse-comments')
const JSDocParser = new CommentParser()

// This is the parser which will be used for Typescript ASTs
const { parse } = require('@typescript-eslint/typescript-estree')

/**
 * JSDoc crawler utility, can be used for documentation purposes
 * @public
 * @method walk
 * @param {string} dir -- To-be-crawled directory
 * @param {Array.<String>} [filelist='[]'] -- Current file list, meant to be used internally
 * @copyright Tom Bazarnik and the contributors
 * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
 */
export async function walk(dir, filelist = []) {
    const files = await fs.readdir(dir)
  
    for (const file of files) {
        const filepath = path.join(dir, file)
        const stat = await fs.stat(filepath)
    
        if (stat.isDirectory()) {
            filelist = await walk(filepath, filelist)
        } else {
            filelist.push(filepath)
        }
    }
  
    return filelist;
}

/**
 * JSDoc crawler utility, can be used for documentation purposes
 * @public
 * @class SourceCodeCrawler
 * @property {string}  sourcePath
 * @copyright Tom Bazarnik and the contributors
 * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
 */
export class SourceCodeCrawler {
    sourcePath: string
    /**
     * Creates an instance of SourceCodeCrawler.
     * @param {string} [pathString='posts/'] - To-be-crawled content directory path string
     * @constructor
     * @description
     * <strong>Source</strong>
     * ```
     * constructor(pathString = 'posts/') {
     *   this.contentPath = path.join(process.cwd(), pathString)
     * }
     * ```
     * @copyright Tom Bazarnik and the contributors
     * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
     */
	constructor(pathString: string = 'src/') {
		this.sourcePath = pathString
    }
    
    /**
     * Crawl the source code for files with the given extensions
     * @param {Array.<String>} [fileTypes='['.svelte', '.js', '.ts']'] - To-be-crawled file types
     * @return {Array.<Object>}  documentation
     * @memberof JSDocCrawler
     * @async
     * @copyright Tom Bazarnik and the contributors
     * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
     */
    async crawl(fileTypes: String[] = ['.svelte', '.js', '.ts']) {
        const docs: SourceCodeFile[] = []
        const files: string[] = await walk(this.sourcePath)
        const filtered: string[] = files.filter((el: string) => {
            let _: boolean = false
            _ = fileTypes.some((type: string) => el.endsWith(type))
            return _
        })
        for await (const f of filtered) {
            try {
                const data: string = await fs.readFile(f, 'utf8')
                const jsdocAst: SourceCodeFileJSDocTree = await JSDocParser.parse(data)
                let esTreeAst: TSESTree.Program = undefined
                try {
                    esTreeAst = await parse(data, {
                        debugLevel: false,
                        loc: true,
                        range: true,
                        comment: true,
                        tokens: true
                    })
                } catch (error) {}
                const sourceCodeFile = new SourceCodeFile({
                    filename: f.replace(/^.*[\\\/]/, ''),
                    path: f,
                    ast: jsdocAst,
                    estree: esTreeAst,
                    comments: jsdocAst
                })
                docs.push(sourceCodeFile) 
            } catch (error) {
                console.log(error.message)
            }
        }
        return docs
    }
}