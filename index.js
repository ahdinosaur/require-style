const { readFileSync } = require('fs')
const { join, dirname } = require('path')
const { assign } = Object
const styleResolve = require('style-resolve')
const CssUrlRegex = require('css-url-regex')

const cssUrlRegex = CssUrlRegex()
const dotSlashRegex = /^[\.\/]*/
const quoteRegex = /["']*/g
const allRegex = /^.*$/

module.exports = requireStyle

function requireStyle (name) {
  const path = styleResolve.sync(name)
  var css = readFileSync(path, 'utf8')
  // resolve any relative paths to absolute paths
  css = css.replace(cssUrlRegex, (_, match) => {
    return match
      .replace(quoteRegex, '')
      .replace(dotSlashRegex, match => join(dirname(path), match))
      .replace(allRegex, match => `'${match}'`)
    })
  return css
}
