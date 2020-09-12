# Contributing

Welcome to the contributing guide ! :wave:

The following document will explain how to set up a proper workspace and start contributing on the Eksplein client.

## Goals

The hereby section is an exhaustive list of principles that any contributor shall apply for the client project. This allows team members and contributors to better understand design decisions.

- The client shall be **fast** and **lightweight**.

> Good web developers care about UX. Whenever possible, avoid using heavy runtime-based frameworks/libraries for simple tasks that can be done with Svelte and CSS.

- The client shall be **testable**. 

> This is why we use TypeScript and some test runners like uvu or Cypress.

- The client shall have **good DX**. 

> No contributor enjoys working on projects with slow compile/re-rendering times, nonsense state management tools or undocumented codebase.

- Use **SSR** for any heavy task.

> Please take advantage of Sapper SSR features. Frameworks like Sapper, Next or Nuxt exist for this exact purpose.

- Components shall be easily **reused**.

> No one likes re-writing components or style rules, in order to use them in other frameworks. Svelte components can be exported as Web Components, just like CSS-in-JS and plain CSS can be used anywhere.

## Setup

##### Contributing to design

You can install [**Gravit Designer**](https://www.designer.io/), a free full-featured cross-platform vector graphic design application, if you plan to contribute to the mockup file `project.gvdesign`.

##### Contributing to content

It is recommended to use a decent **Markdown** editor, like [**Typora**](https://typora.io/), if you plan to contribute to the blog posts.

##### Contributing to client code

The main requirement is to install **Node**.

```bash
node -v   # Check Node version
npm -v    # Check npm version
```

Install dependencies using your favorite package manager.

```bash
npm install
```

Now, you should be able to launch a dev server, using the following command.

```bash
npm run dev
```

## Test

The client is meant to be served as a static website, via the following command.

```bash
npm run export
```

To ensure the client is ready for production usage, it must be **tested**, **linted**, **type-checked** and **license-compliant**. Here is a list of useful scripts :

```bash
npm run test                  # Performs unit tests, via uvu
npm run type-check            # Performs TypeScript type checking
npm run lint                  # Performs linting & small fixes via XO
npm run license-compliance    # Check direct dependencies licenses 
```

As long as the direct dependencies in `package.json` use compatible licenses with GNU General Public License version 3, you're good to go. The check is performed via [`license-compliance`](https://www.npmjs.com/package/license-compliance) CLI tool.

