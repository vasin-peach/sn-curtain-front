'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKEND_URI: '"http://localhost:5000"',
  TEST: JSON.stringify(process.env.TEST)
})