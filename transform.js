const Url = require('url')
const staticModule = require('static-module')
const path = require('path')
const quote = require('quote-stream')
const requireStyle = require('./')
const fromString = require('from2-string')
const PassThrough = require('readable-stream/passthrough')
const resolve = require('resolve')
const pump = require('pump')
const replace = require('replacestream')
const urify = require('urify')

const cssUrlRegex = require('./util/css-url-regex')

module.exports = requireStyleTransform

function requireStyleTransform (file, options) {
  if (/\.json$/.test(file)) return new PassThrough()

  if (!options) options = {}
  var vars = options.vars || {
    __filename: file,
    __dirname: path.dirname(file),
    require: { resolve: resolver }
  }

  var sm = staticModule(
    { 'require-style': styleTransformed },
    { vars: vars, varModules: { path } }
  )
  return sm

  function styleTransformed (file) {
    var css = ''
    try {
      css = requireStyle(file)
    } catch (err) {
      sm.emit('error', err)
    }
    return pump(
      fromString(css),
      replace(cssUrlRegex, (match, _, url) => {
        console.log('match', match)
        try {
          const { pathname } = Url.parse(url)
          // TODO async-ify
          return `url(${urify(pathname)})`
        } catch (err) {
          return match
        }
      }),
      quote()
    )
  }

  function resolver (path) {
    return resolve.sync(path, { basedir: path.dirname(file) })
  }
}
