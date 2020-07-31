import {SourceLocation, Range} from '@typescript-eslint/types/dist/ts-estree'
import {JSDocTag} from './JSDocTag'

class CodeContext {
    type: string
    ctor: string
    name: string
    string: string
    match: any[]
}

class RelatedCode {
    name?: string
    context: CodeContext
    value: string
    range: Range
    loc: SourceLocation
}

export class ExampleCode {
    type?: string
    language?: string
    description?: string
    raw?: string
    value?: string
}

export class SourceCodeFileJSDocTree {
    type: string
    value: string
    range: Range
    loc: SourceLocation
    codeStart: number
    raw: string
    code: RelatedCode
    description: string
    footer: string
    examples: ExampleCode[]
    tags: JSDocTag[]
    inlineTags: any[]
    name: string
	
	constructor(astElementObject: Object) {
		for (const [key, value] of Object.entries(astElementObject))
			this[key] = value
	}
}