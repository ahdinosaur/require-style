const test = require('tape')

const requireStyle = require('../')

test('require-style', function (t) {
  t.ok(requireStyle, 'module is require-able')
  t.end()
})
