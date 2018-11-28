# fetchit <sup>[![Version Badge][package-image]][package-url]</sup>

[![Size][size-image]][size-url]
[![Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Greenkeeper][greenkeeper-image]][greenkeeper-url]
[![License][license-image]][license-url]
[![Fetchit][fetchit-image]][fetchit-url]

> Promise based HTTP client with compatible API.

## Installation

```
npm install @eolme/fetchit --save
```

**Note:** You will also need a Promise polyfill for [older browsers](http://caniuse.com/#feat=promises).

## Usage

### API

Soon.

### Importing

Simple importing `fetchit` function:

```javascript
import { fetchit } from '@eolme/fetchit';

fetchit('npmjs.com').then((response) => {
    console.log(response);
});
```

If for some reason you need to access the `fetchit` function with another name, it is
available via exports:

```javascript
import fetch from '@eolme/fetchit';

fetch('npmjs.com').then((response) => {
    console.log(response);
});
```

This approach can be used to, for example, use as replacement for original `fetch` function.

[package-image]: http://versionbadg.es/eolme/fetchit.svg
[package-url]: https://npmjs.org/package/@eolme/fetchit
[fetchit-image]: https://flat.badgen.net/badge/just/fetchit?color=green
[fetchit-url]: https://github.com/eolme/fetchit
[size-image]: https://img.shields.io/bundlephobia/minzip/@eolme/fetchit.svg?style=flat-square
[size-url]: https://bundlephobia.com/result?p=@eolme/fetchit
[travis-image]: https://img.shields.io/travis/eolme/fetchit.svg?style=flat-square
[travis-url]: https://travis-ci.org/eolme/fetchit
[license-image]: http://img.shields.io/npm/l/@eolme/fetchit.svg?style=flat-square
[license-url]: LICENSE.md
[downloads-image]: https://img.shields.io/npm/dm/@eolme/fetchit.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=@eolme/fetchit
[greenkeeper-image]: https://badges.greenkeeper.io/eolme/fetchit.svg?style=flat-square
[greenkeeper-url]: https://greenkeeper.io/
