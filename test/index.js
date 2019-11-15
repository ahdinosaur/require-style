const test = require('tape')

const requireStyle = require('../')

test('require-style', function (t) {
  t.ok(requireStyle, 'module is require-able')
  t.ok(requireStyle('../index.js'))
  t.end()
})

test('self', function (t) {
  t.ok(requireStyle('./index.js'))
  t.end()
})
