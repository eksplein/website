# Contributing

Welcome to the contributing guide ! :wave:

The following document will explain how to set up a proper workspace and start contributing on the Eksplein client.

## Install

The main requirement is to install **Node**. You are free to choose between using `npm` or `yarn` as your package manager.

```bash
node -v   # Check Node version
npm -v    # Check npm version
```

You can install [**Gravit Designer**](https://www.designer.io/), a free full-featured cross-platform vector graphic design application, if you plan to contribute to the mockup file `project.gvdesign`.

It is recommended to use a decent **Markdown** editor, like **Typora**, if you plan to contribute to the blog posts.

Install dependencies using your Node package manager.

```bash
npm install
```

## Usage

Now, you should be able to launch a dev server, using the following command.

```bash
npm run dev
```

When starting the dev server, multiple custom scripts are running in background :

- ✅ Compile **TypeScript** models (`/src/models`) via **ESbuild**
- 🖼️ Generate images from **Excalidraw** files (`/excalidraw/*.excalidraw`) and save output in `/__eksplein__/excalidraw`
- 🔍 Start watching for **TypeScript** file changes (`/src/models/*.ts`)
- 🚀 Start the **Sapper** server
- 📝 Generate **Docma** API documentation from **JSDoc** comments and save output in `/__eksplein__/docs`

When some JavaScript file changes, it will automatically...

- :arrows_counterclockwise: Reload the **Sapper** server
- :arrows_counterclockwise: Update **Docma** documentation

When some TypeScript file changes, it will automatically...

- :arrows_counterclockwise: ​Re-compile **TypeScript** models
- :arrows_counterclockwise: Reload the **Sapper** server
- :arrows_counterclockwise: Update **Docma** documentation

## API

Eksplein is temporarily using **Docma** as an API documentation generator, which uses **JSDoc** comments in JavaScript source files. This can be accessed via `http://localhost:4000/docs/`. This allows maintainers and contributors to properly understand _what are and how to use_ available classes and methods.

![Docma demo](https://camo.githubusercontent.com/4f42d19f0a7bd6799e81db69e507d4c1bd639313/68747470733a2f2f7261772e6769746875622e636f6d2f6f6e7572792f646f636d612f6d61737465722f646f636d612d73637265656e2e676966)

This is automatically generated / updated :

- 🚀 When **starting** the dev server, using `npm run dev`
- 💾 When some source file is **changed** while dev server is live

A few caveats :

- You need to **manually refresh** the Docma page to notice new changes
- `/docs` route won't work, while `/docs/` does

## Structure

```bash
.
├─── __eksplein__              # Eksplein computed assets
├─── __sapper__                # Sapper builds
├─── cypress                   # Cypress specs and plugins
├─── excalidraw                # Excalidraw JSON files
├─── posts                     # Markdown-based content
├─── src                       # Source files
│   ├─── components            # Svelte UI components
│   ├─── models                # TypeScript-based models
│   ├─── routes                # Sapper routes
│   ├─── _esbuild.js           # On-start ESbuild task
│   ├─── client.js             # Sapper client
│   ├─── server.js             # Sapper server and file watchers
│   ├─── service-worker.js     # Service worker
│   └─── template.html         # Main HTML template entry
├─── static                    # Production-ready static assets
├─── .xo.config.json           # XO linter configuration file
├─── cypress.json              # Cypress configuration file
├─── docma.json                # Docma configuration file
├─── package.json              # Manifest file and scripts
├─── project.gvdesign          # Gravit Designer project file
└─── rollup.config.js          # Rollup configuration file
```

Assuming the client is running on `http://localhost:4000`, here is how the Sapper routing works :

```bash
src/routes
├─── A
│   ├─── B
│   │   ├─── about.svelte        # http://localhost:4000/A/B/about
│   │   └─── index.svelte        # http://localhost:4000/A/B
│   ├─── C
│   │   ├─── [id]
│   │   │   └─── [slug].svelte   # http://localhost:4000/A/C/{id}/{slug}
│   │   └─── index.svelte        # http://localhost:4000/A/C
│   └─── index.svelte            # http://localhost:4000/A
└─── index.svelte                # http://localhost:4000
```

## Testing

Launch **Cypress** tests using the following command :

```bash
npm run test
```

Test suites can be found in `cypress/integration/spec.js`.

## Export

Bundling for production use is done via the following command :

```bash
npm run export
```

This script is taking care of the following stuff :

- ✅ Compiling **TypeScript** source files via **ESbuild**
- ⚖️ Checking for **licenses**, this will tell us if a direct dependency is not compatible with Eksplein's license ![License: MIT](https://img.shields.io/badge/License-GPLv3-blue.svg) <sup>[1]</sup>
- 🖼️ Compute **Excalidraw** files and generate images
- 📦 Telling Sapper to **bundle** the client for production in `/__sapper__/export`
- 📦 Move `/__eksplein__/` content into the production bundle

<sup>[1] - This is notably the case with AGPLv1 and BSD-4-Clause licenses, the whole list can be found <a href="https://www.gnu.org/licenses/license-list.en.html#GPLIncompatibleLicenses">here</a>. </sup>

## FAQ

##### What is the purpose of `__eksplein__` folder ?

Similar to what Sapper does with `__sapper__`, this is the repository for computed assets like **Excalidraw** previews, **Docma** documentation and _to-be-optimized_ assets will be stored, for now.

##### How is TypeScript supported ?

Typescript is supported in Svelte templates via `svelte-preprocess` so it can be used like this :

```html
<script lang="ts">
    export let hello: string = 'world'
</script>
```

Sapper doesn't support TypeScript _yet_ ([sapper#760](https://github.com/sveltejs/sapper/issues/760)), but the Eksplein website project has sort of experimental support, via **ESbuild**, which is a very fast Go-based JavaScript/TypeScript bundler and minifier.

With the current settings, Only the `*.ts` files in the `/src/models` folder will be handled by ESbuild. Outputs and sourcemaps will be saved inside of the mentioned folder.





