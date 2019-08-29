// MarkoJS
require('marko/node-require').install()
require('marko/express')

// Express
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// Middlewares
app.use('/static', express.static('src/app/public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// Routes
const routes = require('../app/routes/routes')
routes(app)

module.exports = app
