# eksplein.me ![status](https://img.shields.io/badge/status-early_concept-lightblue)<img align="right" width="120" height="120" src="https://avatars3.githubusercontent.com/u/68416933?s=200&v=4">

> explain — **_verb_** [ɪkˈspleɪn, ɛkˈspleɪn]<br>
> <sup>_Make (an idea or situation) clear to someone by describing it in more detail or revealing relevant facts. ([source](https://www.lexico.com/definition/explain))_</sup>

This is the repository for the Sapper-based Eksplein website which is supposed to be sort of a modern glossary-like blog in which any given problem meets _high-level_ explanations.

<sup><em><u>Side note</u> : Logo is still early concept.</em></sup>

## Motivation

Primarily targeting computer scientists and media enthusiasts, Eksplein is expected to come with a set of innovating features, addressing various issues in existing glossaries and educational websites.

- Lack of interoperable tutorials (_cf._ languages, frameworks, OSes, versions)
- Bloated explanations
- Spoilers, spoilers everywhere
- _You read a lot. We like that.™_

## Stack

#### Frontend

- **Sapper** ![Sapper](https://img.shields.io/github/package-json/dependency-version/eksplein/website/dev/sapper?filename=package.json&label=Sapper&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAEGUlEQVRIS8VXX2hTVxz+zk3aPtlWTBTsnNaHoSg2A2thtuiqhc0X63wQhGl8UNE0iQF9c9jp2xTSJI1iQdox2NAHrQ+jD07XbTJsq5iKYn1wrcoGazKI7VOT5pzxu/Wk597ce5M5wd9L23v+fOf3ne/7/U4Z3lOw/4NbH720xu0SqzUmttM+XLDh+cLceDYSyZbb962AvdGkDy6EGeC3ARjMFbRINnJsyu4A/xl4eSzZDYYz5TISQmTBWCQdCgxYza0Y2JNIbNe41g+GNepGq5YswWdrG/VPv//5F55kMgYcARyyAi8LXB+N1le5qs4wsBPqjrXV1Yh17MCuN6By7HE6g9BPd4oHoMzzPN9ovndH4GWJi50a5/2MsXoV9IhvE05uaUZdTY0l46/n5rDjh2t4NTurjwshvk2Huwx6sAX2xpI9jCFspjXW0Y6tDQ0GwJlcDgRGtMu4+nRCz/wNcDYd7lqqLrIE9sR7T2hgUXXiqZZmPUtzDP0xidCt2yDw+M527Fu/Tp9CB/mo70pxeq6gNaoqLwEmb1ZphYeS3g0ej77hRq/HgEk0EiAJSgbNHdzbCbp/ihWJi8UxzvinmWBwWH4oAVbtQhvc939Zcpd9qUc4PzKqZ2kVlDUxtHngu8oz9saTwwzYRitIROfaWouLySrBW4uKtUS1+CiA1+lQwCDQkoy98WSWAXW0/sYXnfikYaW+FVG65/qgYVsaO+xrQl3NArVkpQsjYyVMVKTq5fHeKYCtNgOrKrXzsBTVnus3DYVEFPBxOhJIOapapZpoJrplXE6NY2Yup3+z87AEp/uVGrCqXiVUq1aizB4cOlBUqdWd0uZ9qXHUVtcYDvnVb3dBItRD4OZ0ONDpnHE06WMuPLSziLpY9bCTJgTwSzoU0FunrZ28sd4BxthBdRJlfqplS9HLVBwoS9XDNIfEKP1uFKN4MR3qMjQXR1VXahdSN+lBLTIq1WUzpgav0kzF45t7o7g28czyDJTlyZZmHPU1GcapqrV/f3XRVgJfT4cD3bZU6z1XaD/LCX8Hj+u/vpyZhf/HIYNFPl/biLNtrfiwdrEx0FxzkaHikS9oPvNrxEA11elqF580A9PfF0bHcH5kTFe4VR+W6qY5anCISCbU1WOmzPGO1W4jM6cqZfYwCYkahuy/EkQIxNLhgOEBUZGqqb/e2b/P1seU5elf74KqmhpEL2fM/0/wuLHGOtlJb4sunpL1mlpdoqMd9FMNAiNQc4eiLPM8113uiWv5EPDGk34G9KtABLz1g4WGMfR8soRWQLzgTPjVnutkR/unTzxJb6Qembmjpy3sUq4GOD72dJVrvAcMu602onaX565up4e73QHKPm9pIT1x3W63T+Pawr8qGh+en3dPvQ2grarLUfSuxv8FrzLqLgDlI1MAAAAASUVORK5CYII=&color=159497) — Svelte-based server side rendering framework 
- **Svelte** ![Svelte](https://img.shields.io/github/package-json/dependency-version/eksplein/website/dev/svelte?filename=package.json&label=Svelte&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAADY0lEQVRIS8WXMUxTURSGv1vUCSNuOAEJzpbNGAplM3EQEwyjJaySlk0Tk5ZJN0qYFRiNDLDhRKHEuFlmSSiTjG3CBMg15933+u7te68PcfBOcHt7/vuf+//nnCr+01L/gqsfM8xthlDkvTiaGn0cqhqttLg3AtZPyNJHEUUhFkCzxQWL6jvNpAv8NbCeoAKU0xgBLTSLqs563NlrA+tx8mRYA4adQIPDMP7cbDX24Kjh4mjm4sBTgXWeAX5TRlFyIvYPwJs1yE27QD8b8GHOvkCLDCPd794TWOeYRnksB5zoMyWYK4OAx62zFsyPwan/xJoNVXf1kAisJ6gCxUhaheWYEXFnnbVBwAaHwr2dDXjf0V5L7XPf/kossM5RQrHsBJ+rQCFGUwfbBkCA367D01fma/L/MwvrnBFb5RFgz5t3+NFJ72jWvOXDrMvy9MQANmrhvpxdqUH/PbM3aYW/Ykod0DkcBbbtIm/4+Tj6lpsrsFYxrOLW0wJIhmYtA6QyzlFDMenFExEtWBk/OjQsuy0TD2/vttW+K9A4xkLD5ErSljV38Dxa7BJVNg8zxTAjcqH1pWgmrqNqnaOJwsjTBrZVmuThQFTFKTcrl4ypbziVJcrYTvVC1TAK1peqYfOylOzhAHx2JGQeU73igEMreeJqhiqNe0vx8GbVXMS+5Oqi2Zel2VZ1nBIXBZbOc8uzk1ndFrHBbQ/30oRmT9X91ul/P47xOgq/CvinhI3YQy4RpFLSbntYzlR3Q7/bYtScqLrbXHqrOt0m5oSo+/WyW2TcVPdm7DV4O83yvp/K8HUj/grCUsqoiM1eUtXms7atltS+18c7y2Hs99zdzqd72vz5qwnvXrgWGZ82LB+47ZlokWlzTrZ7GnGBTZ0+jgDLhhQGKZNJHg7ULWfsZaYQX94JjGVbT3iDmqlcdrcJmN8diHpYhCSlNOi/YfwVtd81QFxL1TLWfGwk+1hYrpZgJzJWtdEUVJ2tJH0mtUUpb4a1WEiYjz5yY0gJFdBoh1ohQyVtxE0aBAr+yBOCyQXENrIOtqJp1Zx4LK2em8RW9pNHnxwCLqLwu3qvMETs0vN0L2BPaOaXQhWFP792hdNscEGl1+B+7TeOO+iNuJdkyfj19ooalzRvAhjET52r01J208//ACVGQy4B+QKGAAAAAElFTkSuQmCC&color=FF3E00) — Boilerplate-free JavaScript frontend framework

## Topics

By default, navigating between requested Markdown-based blog posts is handled by Sapper, using topic-specific URL patterns.

#### 📐 Math

```ruby
/how/to/get/[SOMETHING]
/how/to/get/[SOMETHING]/from/[INPUT]
```

`how/to/get/circumference` → _How to get circumference ?_

`how/to/get/hypotenuse/from/sides` → _How to get hypotenuse value from sides' lengths ?_

#### 🖥️ Dev

```ruby
/how/to/use/[SOMETHING]
/how/to/use/[SOMETHING]/in/[LANGUAGE]
/how/to/use/[SOMETHING]/in/[FRAMEWORK]/[VERSION]
```

`how/to/use/monads` → _How to use monads ?_

`how/to/use/higher-order-functions/in/ocaml` → _How to use higher-order functions in OCaml ?_

```ruby
/how/to/deploy/[SOMETHING]/on/[CONTEXT]
```

`how/to/deploy/gatsby/on/docker` → _How to deploy a Gatsby website within a Docker container ?_

`how/to/deploy/node/on/netlify` → _How to deploy a Node application on Netlify ?_

#### 🕹️ Gaming

```ruby
/how/to/beat/[BOSS]/in/[GAME]/[YEAR]
/how/to/beat/[MAP]/in/[GAME]/[YEAR]
```

`how/to/beat/sephiroth/in/kingdom-hearts` → _How to beat Sephiroth in Kingdom Hearts ?_

`how/to/beat/shrine-of-amana/in/darks-souls-2` → _How to complete Shrine of Amana zone in Darks Souls 2 ?_

#### 📺 TV Shows

```ruby
/what/happened/in/[SHOW]/[YEAR]/[EPISODE]
```

`what/happened/in/re-zero/S02E01` → _What happened in Re:Zero − Starting Life in Another World Season 2 Episode 1 ?_

`what/happened/in/fruits-basket/2019/S02E04` → _What happened in Fruits Basket (2019' remake) Season 2 Episode 4 ?_

## Contributing

> Since this is pretty much early concept, contributing guides are still work-in-progress.

Unless needing some backend features; which in this case you will first need to set up the Actix-based server [as it follows](https://github.com/eksplein/eksplein/blob/master/CONTRIBUTING.md); the only required tool is **Node**. A decent **Markdown** editor (_e.g._ **Typora**) is recommended.

Then you shall proceed with the **[CONTRIBUTING](https://github.com/eksplein/website/blob/master/CONTRIBUTING.md)** guide.

##### TL;DR

Fork or clone the repo and install dependencies, using `npm` or `yarn`

```bash
npm install
```

Launch the client in development mode

```bash
npm run dev
```

Launch Cypress testing suites

```bash
npm run test
```

Export the client to production

```bash
npm run export
```

## Inspirations

- [DigitalOcean Community tutorials](https://www.digitalocean.com/community/tutorials) — DigitalOcean
- [whatthefuck.is](https://whatthefuck.is/) — Dan Abramov
- [Urban Dictionnary](https://www.urbandictionary.com/) — Urban Dictionary LLC

## License

Sapper-based Eksplein **client** is under [**GPLv3 License**](https://github.com/eksplein/website/master/LICENSE). ![License: MIT](https://img.shields.io/badge/License-GPLv3-blue.svg)

Markdown-based Eksplein **posts**, code snippets not included, are, unless stated otherwise by the post author, under [**CC BY-SA License**](https://github.com/eksplein/eksplein/blob/master/client/LICENSE-POSTS.md). ![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)
