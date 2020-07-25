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
 * General-purpose emote utility,
 * @public
 * @constant
 * @class Emote
 * @copyright Tom Bazarnik and the contributors
 * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a>
 */
export class Emote {
	/**
     * Creates an instance of Emote
     * @param {Object} emoteObject - The emote object
     * @param {String} emoteObject.slug - Emote slug <code>myEmote</code> which then will be available as => <code>:myEmote:</code>
     * @param {String} emoteObject.imageUrl - Emote image url
     * @param {String} [emoteObject.title=emoteObject.slug] - Custom emote title string, defaults internally to <code>emoteObject.slug</code>
     * @param {String} [emoteObject.category="general"] - Primary tag for the emote
     * @param {Array.<String>} [emoteObject.tags=[]] - Additional tags for easier emote searching
     * @param {String} [emoteObject.description=""] - Emote description
     * @param {String} [emoteObject.copyright="Tom Bazarnik and the contributors"] - Copyright notice
     * @param {String} [emoteObject.licence="MIT"] - Licence
     * @constructor
     */
	constructor(emoteObject: Record<string, unknown>) {
		for (const [key, value] of Object.entries(emoteObject))
			this[key] = value
	}
}
