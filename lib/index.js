/**
 * Analytics.js
 *
 * (C) 2017 Segment Inc.
 */

var Integrations = require('./integrations')
var analytics = require('@segment/analytics.js-core')

/**
 * Expose the `analytics` singleton.
 */

module.exports = exports = analytics

/**
 * Expose require.
 */

analytics.require = require

/**
 * Expose `VERSION`.
 */

exports.VERSION = require('../package.json').version

/**
 * Add integrations.
 */

Object.keys(Integrations).forEach(function (name) {
  analytics.use(Integrations[name])
})
