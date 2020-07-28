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

import sirv from 'sirv'
import polka from 'polka'
import chokidar from 'chokidar'
import compression from 'compression'
import * as sapper from '@sapper/server'

import { getAllTypeScriptFilesFrom } from './_common'

const { build } = require('esbuild')
const Docma = require('docma')

const {PORT, NODE_ENV} = process.env
const dev = NODE_ENV === 'development'

const SERVE_STATIC = sirv('static', {dev})
const SERVE_OUTPUT = sirv('__eksplein__', {dev})

const docma = new Docma();
const docmaConfig = {
    src: [
        "./src/models/**/*.js"
    ],
    dest: "__eksplein__/docs",
    app: {
        title: "Docma",
        favicon: "static/docma.ico",
        routing: "path",
        base: "/docs/"
    },
    template: {
        options: {
            title: {
                label: "Eksplein",
                href: "/"
            }
        }
    },
    debug: Docma.Debug.DISABLED
}

const updateDocma = async () => {
    const startTime = new Date()
    docma.build(docmaConfig).then(success => {
        const exitTime = new Date()
        console.log('\u001B[32m%s\u001B[0m \u001B[90m%s\u001B[0m', '✔ docma', `(${exitTime.getTime() - startTime.getTime()}ms)`)
    }).catch(error => {
        const exitTime = new Date()
        console.log('\u001B[31m%s\u001B[0m \u001B[90m%s\u001B[0m', '✗ docma', `(${exitTime.getTime() - startTime.getTime()}ms)`)
        console.log(error.stack);
    })
}

const startWatchingTypeScript = async () => {
    const typeScriptFiles = await getAllTypeScriptFilesFrom('src/models')
    if (dev) {
        const watcher = chokidar.watch('src/models/**/*.ts', {
            ignored: /(^|[\/\\])\../, // ignore dotfiles
            persistent: true
        })
        watcher.on('change', path => {
            console.log(`\n\u001B[36m%s\u001B[0m changed, retranspiling...`, path)
            typeScriptFiles.forEach(el => {
                build({
                    entryPoints: [el],
                    outfile: `${el.replace(/.ts$/g, '.js')}`,
                    minify: true,
                    sourcemap: true
                }).catch(() => process.exit(1))
            })
        })
    }
}

startWatchingTypeScript()

polka() // You can also use Express
    .use(
        compression({threshold: 0}),
        SERVE_STATIC,
        SERVE_OUTPUT,
        sapper.middleware()
    )
    .listen(PORT, err => {
        if (err) console.log('error', err)
        if (dev) updateDocma()
    })