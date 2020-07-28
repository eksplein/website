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

import {TranslationEntry, ISO_639_1} from './TranslationEntry'

/**
 * General-purpose translatable UI label utility,
 * @public
 * @constant
 * @class TranslatableLabel
 * @copyright Tom Bazarnik and the contributors
 * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
 */
export class TranslatableLabel {
	translations: TranslationEntry[]
	defaultText: string
	/**
     * Creates an instance of TranslatableLabel
     * @param {Object} labelObject - The translatable label object
     * @param {string} labelObject.slug - Label slug
     * @param {string} labelObject.defaultText - Default english label text
     * @param {Array.<TranslationEntry>} [labelObject.translations=[]] - Available translations
     * @constructor
     * @copyright Tom Bazarnik and the contributors
     * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
     */
	constructor(labelObject: Record<string, unknown>) {
		this.translations = []
		for (const [key, value] of Object.entries(labelObject))
			this[key] = value
	}

	/**
     * Push new translation for a label
     * @method
     * @param {TranslationEntry} translationObject - the translation entry
     * @param {ISO_639_1} translationObject.language - <a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes">ISO_639-1</a> Language code
     * @param {string} translationObject.entry - the translation entry
     * @copyright Tom Bazarnik and the contributors
     * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
     */
	addTranslation(translationObject: TranslationEntry) {
		const {language, entry} = translationObject
		this.translations.push(new TranslationEntry(language, entry))
	}

	/**
     * Push new translation for a label
     * @method
     * @param {ISO_639_1} language - <a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes">ISO_639-1</a> Language code
     * @return {string} translated - Translated label, falls back to <code>defaultText</code> if none found
     * @copyright Tom Bazarnik and the contributors
     * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
     */
	in(language: ISO_639_1): string {
		return this.translations.find(element => element.language === language).entry
	}
}
