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

var __defineProperty = Object.defineProperty;
var __markAsModule = (target) => {
  return __defineProperty(target, "__esModule", {value: true});
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defineProperty(target, name, {get: all[name], enumerable: true});
};

// src/_common.js
__export(exports, {
  getAllTypeScriptFilesFrom: () => getAllTypeScriptFilesFrom,
  getFiles: () => getFiles
});
const {resolve} = require("path");
const {readdir} = require("fs").promises;
const getFiles = async function* getFiles2(dir) {
  const dirents = await readdir(dir, {withFileTypes: true});
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles2(res);
    } else {
      yield res;
    }
  }
};
const getAllTypeScriptFilesFrom = async (dir) => {
  let _ = [];
  for await (const f of getFiles(dir)) {
    if (f.endsWith(".ts"))
      _.push(f);
  }
  return _;
};