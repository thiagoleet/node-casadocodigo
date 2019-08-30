const uuid = require('uuid')
const sessao = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('./database')
const UsuarioDao = require('../app/infra/usuario-dao')

module.exports = app => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'senha'
      },
      (email, senha, done) => {
        const usuarioDao = new UsuarioDao(db)
        usuarioDao
          .buscaPorEmail(email)
          .then(usuario => {
            if (!usuario || usuario.senha != senha) {
              return done(null, false, { mensagem: 'Login e senha incorretos' })
            }
            return done(null, usuario)
          })
          .catch(erro => done(erro, null))
      }
    )
  )

  passport.serializeUser((usuario, done) => {
    const usuarioSessao = {
      nome: usuario.nome_completo,
      email: usuario.email
    }
    done(null, usuarioSessao)
  })

  passport.deserializeUser((usuarioSessao, done) => {
    done(null, usuarioSessao)
  })

  app.use(
    sessao({
      secret: 'node alura',
      genid: function(req) {
        return uuid()
      },
      resave: false,
      saveUninitialized: false
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  // Dependency Injection
  app.use(function(req, res, next) {
    req.passport = passport
    next()
  })
}
