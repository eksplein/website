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

Now, you should be able to launch a development server, using the following command.

```bash
npm run dev
```

## Structure

```bash
.
├─── __sapper__                # Sapper builds
├─── __docs__                  # Docma builds
├─── cypress                   # Cypress specs and plugins
├─── excalidraw                # Excalidraw JSON files
├─── posts                     # Markdown-based content
├─── src                       # Source files
│   ├─── components            # Svelte components
│   ├─── routes                # Sapper routes
│   ├─── client.js             # Main Sapper entrypoint
│   ├─── server.js             # Sapper dev server
│   ├─── service-worker.js     # Service worker
│   └─── template.html         # Main HTML template entry
├─── static                    # Production-ready static assets
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

## API

Use the following command to generate **Docma**-based API documentation, using **JSDoc** comments in JavaScript files and the `docma.json` configuration file. 

```bash
npm run docma
```

The output is stored inside `__docs__` folder and should now be accessed via your browser at `http://localhost:9000/`.

## Testing

Launch Cypress tests using the following command :

```bash
npm run test
```

Test suites can be found in `cypress/integration/spec.js`.

## Export

Bundling for production use is done via the following command :

```bash
npm run export
```

This script is taking care of several tasks :

- **License check** — Also doable via `npm run license-compliance`, this basically checks if the production build will only bundle dependencies which are compatible with Eksplein' [**GPLv3 License**](https://github.com/eksplein/website/master/LICENSE). ![License: MIT](https://img.shields.io/badge/License-GPLv3-blue.svg)
- **Generate Excalidraw images** — This generates PNG images from Excalidraw JSON schemas (`*.excalidraw`) and output in `static/excalidraw`, using `@tommywalkie/excalidraw-cli`. This is also done when starting the dev server.
- **Export the client** — If everything worked, Sapper now takes care of bundling and exporting the client in `__sapper__/export`. 



