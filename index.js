const express = require('express');
const helmet = require('helmet')
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const compression = require('compression');

// Using
app.use(helmet())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(compression());


if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('frontend/dist'))
}

const PORT = process.env.PORT || 5000;
app.listen(PORT)
console.log('starting frontend at port ' + PORT + '.');