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

import {AST_NODE_TYPES} from '@typescript-eslint/types'
import {ExampleCode} from './SourceCodeFileJSDocTree'
import {JSDocTag} from './JSDocTag'
import {
    Accessibility,
    ClassBody,
    ClassProperty,
    ExportDeclaration,
    Parameter,
    Range,
    SourceLocation,
    Statement,
    TSEnumMember,
    TSTypeAnnotation
} from '@typescript-eslint/types/dist/ts-estree'

/**
 * Normalized source code file abstract syntax tree utility,
 * @public
 * @export
 * @class AbstractSyntaxTreeElement
 * @copyright Tom Bazarnik and the contributors
 * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
 */
export class AbstractSyntaxTreeElement {
    identifier: string
    valueType?: AST_NODE_TYPES
    type: AST_NODE_TYPES
    loc: SourceLocation
    range: Range
    declaration?: ExportDeclaration
    body?: ClassBody | Statement[]
    members?: (ClassProperty | TSEnumMember)[]
    params?: Parameter[]
    async?: boolean
    readonly?: boolean
    accessibility?: Accessibility
    returnType?: TSTypeAnnotation
    description?: string
    examples?: ExampleCode[]
    filename: string
    path: string
    exported: boolean
    tags?: JSDocTag[]
    jsdoc?: any
    copyright?: string
    licence?: string
    properties?: any[]
    methods: any[]

    /**
     *
     * Get human-readable node type from ESTree
     * @private
     * @method getValueType
     * @returns {HUMAN_READABLE_TYPES} -- General purpose type
     * @memberof AbstractSyntaxTreeElement
     */
    private getValueType() {
        const getNodeTypeFrom = el => el.type
        if (this.type === AST_NODE_TYPES.ExportNamedDeclaration)
            return getNodeTypeFrom(this.declaration)
        else
            return getNodeTypeFrom(this)
    }

    /**
     *
     * Get identifier from ESTree
     * @private
     * @method getIdentifier
     * @returns {string} -- Identifier
     * @memberof AbstractSyntaxTreeElement
     */
    private getIdentifier() {
        const getIdentifierFrom = el => {
            switch (this.valueType) {
                case AST_NODE_TYPES.ClassDeclaration:
                    return el.id.name
                case AST_NODE_TYPES.TSEnumDeclaration:
                    return el.id.name
                case AST_NODE_TYPES.FunctionDeclaration:
                    return el.id.name
                case AST_NODE_TYPES.VariableDeclaration:
                    return el.declarations[0].id.name
                default:
                    return 'Unknown identifier'
            }
        }
        if (this.type === AST_NODE_TYPES.ExportNamedDeclaration) {
            this.exported = true
            return getIdentifierFrom(this.declaration)
        }
        else
            return getIdentifierFrom(this)
    }

    /**
     * Creates an instance of AbstractSyntaxTreeElement.
     * @param {Object} astObject
     * @memberof AbstractSyntaxTreeElement
     * @constructor
     */
    constructor(astObject: Object) {
        this.properties = []
        this.exported = false
		for (const [key, value] of Object.entries(astObject))
            this[key] = value
        this.valueType = this.getValueType()
        this.identifier = this.getIdentifier()
        if (this.valueType === AST_NODE_TYPES.ClassDeclaration) {
            const classMembers = this.getClassMembers()
            this.properties = classMembers.filter(el => el.type === 'ClassProperty')
            this.methods = classMembers.filter(el => el.type === 'MethodDefinition')
        }
    }

    /**
     *
     *
     * @param {*} jsdoc
     * @memberof AbstractSyntaxTreeElement
     */
    setDescriptionFromJSDoc(jsdoc: any) {
        this.description = jsdoc && jsdoc.description ? jsdoc.description : ''
    }

    /**
     *
     *
     * @returns
     * @memberof AbstractSyntaxTreeElement
     */
    getClassMembers() {
        const getMembersFrom = (givenClass: any) => givenClass.body && givenClass.body.body ? givenClass.body.body : []
        if (this.type === AST_NODE_TYPES.ExportNamedDeclaration)
            return getMembersFrom(this.declaration)
        return getMembersFrom(this)
    }


}