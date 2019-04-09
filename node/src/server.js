'use strict';

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');

const models = join(__dirname, 'app/model');
const port = 3000;
const app = express();

module.exports = app;

function listen () {
  app.listen(port);
  console.log('Express app started on port ' + port);
}

function connect () {
  var options = { useNewUrlParser: true, server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.db, options);
}

// Load model, passport config and routes
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));
require('./config/passport');
require('./config/routes')(app);

connect().then(() => { listen() },
              (err) => { console.log(err) })
