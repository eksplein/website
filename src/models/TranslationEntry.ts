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

/**
 * Enum for <a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes">ISO_639-1</a> language codes.
 * @readonly
 * @enum {string} ISO_639_1
 * @copyright Tom Bazarnik and the contributors
 * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
 */
export enum ISO_639_1 {
	/** French <img src="https://img.icons8.com/color/24/000000/france-circular.png" style="vertical-align: top;"/> */
	FR = 'fr',
	/** English <img src="https://img.icons8.com/color/24/000000/great-britain-circular.png" style="vertical-align: top;"/> */
	EN = 'en',
	/** German <img src="https://img.icons8.com/color/24/000000/germany-circular.png" style="vertical-align: top;"/> */
	DE = 'de',
	/** Italian <img src="https://img.icons8.com/color/24/000000/italy-circular.png" style="vertical-align: top;"/> */
	IT = 'it',
	/** Spanish <img src="https://img.icons8.com/color/24/000000/spain-circular.png" style="vertical-align: top;"/> */
	ES = 'es',
	/** Japanese <img src="https://img.icons8.com/color/24/000000/japan-circular.png" style="vertical-align: top;"/> */
	JP = 'jp',
	/** Chinese <img src="https://img.icons8.com/color/24/000000/china-circular.png" style="vertical-align: top;"/> */
	ZH = 'zh',
	/** Portuguese <img src="https://img.icons8.com/color/24/000000/portugal-circular.png" style="vertical-align: top;"/> */
	PT = 'pt',
	/** Russian <img src="https://img.icons8.com/color/24/000000/russian-federation-circular.png" style="vertical-align: top;"/> */
	RU = 'ru',
	/** Korean <img src="https://img.icons8.com/color/24/000000/south-korea-circular.png" style="vertical-align: top;"/> */
	KO = 'ko',
	/** Hindi <img src="https://img.icons8.com/color/24/000000/india-circular.png" style="vertical-align: top;"/> */
	HI = 'hi',
}

/**
 * Low-level translation entry utility,
 * @public
 * @class TranslationEntry
 * @copyright Tom Bazarnik and the contributors
 * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
 */
export class TranslationEntry {
	entry: string
	language: ISO_639_1
	/**
     * Creates an instance of Translation
     * @param {ISO_639_1} language - <a href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes">ISO_639-1</a> Language code
     * @param {string} entry - Translated label
     * @constructor
     * @copyright Tom Bazarnik and the contributors
     * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
     */
	constructor(language: ISO_639_1, entry: string) {
		this.language = language
		this.entry = entry
	}
}
