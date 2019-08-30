// MarkoJS
require('marko/node-require').install()
require('marko/express')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const templates = require('../app/views/templates')

// Middlewares
app.use('/estatico', express.static('src/app/public'))

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(
  methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// Authentication
const sessaoAutenticacao = require('./sessao-autenticacao')
sessaoAutenticacao(app)

// Routes
const routes = require('../app/routes')
routes(app)

// 404 Not Found
app.use(function(req, res, next) {
  return res.status(404).marko(templates.base.erro404)
})

// 500 Error
app.use(function(error, req, res, next) {
  return res.status(500).marko(templates.base.erro500)
})

module.exports = app
