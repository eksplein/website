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
 * Car
 * @public
 * @constant
 * @class Car
 * @copyright Tom Bazarnik and the contributors
 * @license <a href="http://www.gnu.org/licenses/gpl-3.0.en.html">GNU General Public License v3.0</a> 
 */
export const Car = class Car {
    /**
     * Creates an instance of Car.
     * @param {String} brand
     * @constructor
     * @return {Car} The car.
     */
    constructor(brand) {
        /**
         * someProperty is an example property that is set to `true`
         * @type {String}
         * @public
         */
        this.carname = brand;
    }

    /**
     * Get the car name.
     * @method
     * @return {String} The carname.
     * @example <caption>Example usage of Car.cnam().</caption>
     * const myCar = new Car('Peugeot')
     * Car.cnam(); // returns 'Peugeot'
     */
    static get cnam() {}

    get cnam() {
        return this.carname;
    }

    /**
     * Set the car name.
     * @method
     * @type {String}
     */
    set cnam(x) {
        this.carname = x;
    }
}