'use strict'
module.exports = {
  NODE_ENV: '"production"',
  BACKEND_URI: JSON.stringify(process.env.BACKEND_URI),
  GITLAB_USERNAME: JSON.stringify(process.env.GITLAB_USERNAME),
  OMISE_CLIENT: JSON.stringify(process.env.OMISE_CLIENT)
}
