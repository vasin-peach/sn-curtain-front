'use strict'
module.exports = {
  NODE_ENV: '"production"',
  BACKEND_URI: JSON.stringify(process.env.BACKEND_URI),
  TEST_URI: JSON.stringify(process.env.TEST_URI)
}
