'use strict';

const bodyParser = require('body-parser')
const cors = require('cors');
const auth = require('./auth');

const User = require('../app/controller/User');

module.exports = function (app) {
  app.use(cors());
  app.use(bodyParser.json());

  app.get('/', function(req, res) {
    res.send('This is a void HomePage');
  });

  app.post('/users/', auth.optional, User.create);
  app.post('/users/login', auth.optional, User.login);
  app.get('/users/current', auth.required, User.current);

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message) {
      if (~err.message.indexOf('No authorization token was found') || ~err.message.indexOf('invalid token')) {
        req.error = {
          status: 401,
          message: 'Access denied'
        }
        return next();
      }
      if (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed'))) {
        return next();
      }
    }

    console.error(err.stack);
    console.error('message: '+ err.message);

    if (err.stack.includes('ValidationError')) {
      res.status(422).render('422', { error: err.stack });
      return;
    }

    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    let status = 404, error = 'not found';
    if (req.error !== undefined){
      status = req.error.status;
      error = req.error.message;
    }
    const payload = {
      url: req.originalUrl,
      error: error
    };
    if (req.accepts('json')) return res.status(status).json(payload);
    res.status(status).render(status.toString(), payload);
  });
};
