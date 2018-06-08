const express = require('express');
const helmet = require('helmet')
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

// Using
app.use(helmet())
app.use(bodyParser.urlencoded({
  extended: true
}));


if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('frontend/dist'))
}

const PORT = process.env.PORT || 5000;
app.listen(PORT)