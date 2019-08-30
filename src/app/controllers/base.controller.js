const templates = require('../views/templates')
const LivroController = require('./livro.controller')

class BaseController {
  static routes() {
    return {
      home: '/',
      login: '/login'
    }
  }
  home() {
    return function(req, res) {
      res.marko(templates.base.home)
    }
  }

  login() {
    return function(req, res) {
      res.marko(templates.base.login)
    }
  }

  efetuaLogin() {
    return function(req, res, next) {
      const passport = req.passport
      passport.authenticate('local', (erro, usuario, info) => {
        if (info) {
          return res.marko(templates.base.login)
        }

        if (erro) {
          console.error(erro)
          return next(erro)
        }

        req.login(usuario, erro => {
          if (erro) {
            return next(erro)
          }
          return res.redirect(LivroController.routes().lista)
        })
      })(req, res, next)
    }
  }
}

module.exports = BaseController
