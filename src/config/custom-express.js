// MarkoJS
require('marko/node-require').install()
require('marko/express')

// Express
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
const routes = require('../app/routes/routes')
routes(app)

module.exports = app
