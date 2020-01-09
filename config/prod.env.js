'use strict'
module.exports = {
  NODE_ENV: '"production"',
  BACKEND_URI: JSON.stringify(process.env.BACKEND_URI),
  BACKEND_IP: JSON.stringify(process.env.BACKEND_IP),
  GITLAB_USERNAME: JSON.stringify(process.env.GITLAB_USERNAME),
  OMISE_CLIENT: JSON.stringify(process.env.OMISE_CLIENT),
}
