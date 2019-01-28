'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKEND_URI: '"http://localhost:5000"',
  BACKEND_IP: '"http://localhost:5000"',
  GITLAB_USERNAME: '"Peaches"',
  OMISE_CLIENT: '"pkey_test_5diatzutqj695r6wsvp"'
})
