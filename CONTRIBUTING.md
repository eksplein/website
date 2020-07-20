# Contributing

Welcome to the contributing guide ! :wave:

The following document will explain how to set up a proper workspace and start contributing on the Eksplein client.

## Install

The main requirement is to install **Node**. You are free to choose between using `npm` or `yarn` as your package manager.

```bash
node -v   # Check Node version
npm -v    # Check npm version
```

You can install [**Gravit Designer**](https://www.designer.io/), if you plan to contribute to the mockup file `project.gvdesign`. Gravit Designer is a free full-featured cross-platform vector graphic design application.

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

## Documentation

API documentation is available via **Docma**, using the following command :

```bash
npm run docma
```

Then open your browser at `http://localhost:9000/`.

Documentation is generated using **JSDoc** comments in JavaScript files.

## Testing

Launch Cypress tests using the following command :

```bash
npm run test
```

Test suites can be found in `cypress/integration/spec.js`.