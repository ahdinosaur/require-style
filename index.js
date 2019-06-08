'use strict' // needed for caller-path

const { readFileSync } = require('fs')
const { join, dirname } = require('path')
const styleResolve = require('style-resolve')
const isWindows = require('is-windows')
const slash = require('slash')
const caller = require('caller-path')

const cssUrlRegex = require('./util/css-url-regex')
const dotSlashRegex = /^[./]*/

module.exports = requireStyle

function requireStyle (name) {
  const path = styleResolve.sync(name, {
    basedir: dirname(caller())
  })
  var css = readFileSync(path, 'utf8')

  // resolve any relative paths to absolute paths
  css = css.replace(cssUrlRegex, (_, _2, url) => {
    url = url
      .replace(dotSlashRegex, match => join(dirname(path), match))

    if (isWindows()) url = slash(url)

    return `url('${url}')`
  })
  return css
}
