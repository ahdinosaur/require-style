# require-style

require modules that target css in electron or the browser

_only tested to work with `font-awesome`, made for [`patchbay`](https://github.com/ssbc/patchbay)_

```shell
npm install --save require-style
```

## example

```js
const requireStyle = require('require-style')

const css = requireStyle('font-awesome')

console.log('font-awesome', css)
```

## usage

### `requireStyle = require('require-style')`

### `css = requireStyle(path)`

- looks up path using [`style-resolve`](https://github.com/stackcss/style-resolve)
- reads associated file
- converts any `url(...)` relative file paths to absolute file paths

### browserify transform

includes a browserify transform which allows this module to work as expected in the browser, including conversion of any `url(...)` file paths to data URIs using [`urify`](https://github.com/mattdesl/urify)

using the `browserify` cli:

```
browserify entry.js -t require-style/transform
```

using your `package.json`:

```
"browserify": {
  "transform": [
    "require-style/transform"
  ]
}
```

## license

The Apache License

Copyright &copy; 2017 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
