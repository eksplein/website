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

import {TSESTree, AST_NODE_TYPES} from '@typescript-eslint/types'
import {SourceCodeFileJSDocTree} from './SourceCodeFileJSDocTree'
import {AbstractSyntaxTreeElement} from './AbstractSyntaxTreeElement'

/**
 * General-purpose source code file utility,
 * @public
 * @class SourceCodeFile
 * @copyright Tom Bazarnik and the contributors
 * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
 */
export class SourceCodeFile {
    filename: string
    path: string
    ast?: any[]
    estree?: TSESTree.Program
    comments: SourceCodeFileJSDocTree[]
	/**
     * Creates an instance of SourceCodeFile
     * @constructor
     * @copyright Tom Bazarnik and the contributors
     * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
     */
	constructor(sourceCodeFileObject: Object) {
		for (const [key, value] of Object.entries(sourceCodeFileObject))
            this[key] = value
        let classes = {}
        let enums = {}
        let constants = {}
        let methods = {}
        if (this.comments && this.comments.length > 0) {
            this.comments.forEach(comment => {
                if (comment.tags && comment.tags.length > 0) {
                    if (comment.tags.some(e => e.title === 'class'))
                        classes[comment.code.context.name] = comment
                    let i = 0
                    if (comment.tags.some((e, index) => {
                        if (e.title === 'enum') {
                            i = index
                            return true
                        }
                    })) {
                        enums[comment.tags[i].description] = comment
                    }
                    i = 0
                    if (comment.tags.some((e, index) => {
                        if (e.title === 'constant') {
                            i = index
                            return true
                        }
                    })) {
                        constants[comment.tags[i].name] = comment
                    }
                }
            })
        }
        let ast = []
        if (this.estree && this.estree.body && this.estree.body.length > 0) {
            this.estree.body.forEach(el => {
                if (el.type !== AST_NODE_TYPES.ImportDeclaration) {
                    const AstElement = new AbstractSyntaxTreeElement(el)
                    switch (AstElement.valueType) {
                        case AST_NODE_TYPES.ClassDeclaration:
                            AstElement.setDescriptionFromJSDoc(classes[AstElement.identifier])
                            break;
                        case AST_NODE_TYPES.TSEnumDeclaration:
                            AstElement.setDescriptionFromJSDoc(enums[AstElement.identifier])
                            break;
                        case AST_NODE_TYPES.VariableDeclaration:
                            const constant = constants[AstElement.identifier] ? constants[AstElement.identifier] : null
                            AstElement.setDescriptionFromJSDoc(constant)
                            break;
                    
                        default:
                            break;
                    }
                    if (AstElement.valueType === AST_NODE_TYPES.VariableDeclaration && !AstElement.exported) {

                    }
                    else {
                        ast.push(AstElement)
                    }
                }
            })
        }
        this.ast = ast
	}
}