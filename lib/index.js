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

// Analytics.js Initialize Options
var config = {initialPageview: true}

// Get CompanyId and ChannelId from used sdk.js url
var findSDK = false
var dev = false
var regex = /\/\/cdn\.app-arena\.com\/companies\/([^]*)\/channels\/([^]*)?\/sdk.*/
var devRegex = /\/aa.sdk.dev*/
var scripts = document.getElementsByTagName('script')
for (var i = 0; i < scripts.length; i++) {
  var src = scripts[i].src
  var result = regex.exec(src)

  //Check if the develop version of analytics.js is embedded
  var devResult = devRegex.exec(src)
  if (devResult) {
    console.info('You are using the develop version of the analytics.js')
    analytics.debug()
  }

  // Check if the script src matches our regex.
  if (!result) {
    continue
  }

  findSDK = true

  // If the script does match our regex, check which company was requested.
  config.companyId = parseInt(result[1]);
  // If the script does match our regex, check which channel was requested.
  config.channelId = parseInt(result[2]);
}

if (findSDK && config.companyId) {
  analytics.initialize({
    AppArena: {
      companyId: config.companyId
    }
  }, config)
} else {
  console.warn('Could not initialize, Your are not using the sdk from the correct url')
}
