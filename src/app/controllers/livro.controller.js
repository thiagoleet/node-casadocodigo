const { validationResult } = require('express-validator/check')
const db = require('../../config/database')
const LivroDao = require('../infra/livro-dao')
const templates = require('../views/templates')

class LivroController {
  static routes() {
    return {
      autenticadas: '/livros*',
      lista: '/livros',
      cadastro: '/livros/form',
      edicao: '/livros/form/:id',
      delecao: '/livros/:id'
    }
  }

  lista() {
    return function(req, resp) {
      const livroDao = new LivroDao(db)
      livroDao
        .lista()
        .then(livros =>
          resp.marko(templates.livros.lista, {
            livros: livros
          })
        )
        .catch(erro => console.log(erro))
    }
  }

  formCadastro() {
    return function(req, resp) {
      resp.marko(templates.livros.form, {
        livro: { titulo: '', preco: '' }
      })
    }
  }

  formEdicao() {
    return function(req, resp) {
      const id = req.params.id
      const livroDao = new LivroDao(db)

      livroDao
        .buscaPorId(id)
        .then(livro =>
          resp.marko(templates.livros.form, {
            livro: livro
          })
        )
        .catch(erro => console.log(erro))
    }
  }

  cadastrar() {
    return function(req, resp) {
      const livroDao = new LivroDao(db)
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        console.error(errors.array())
        return resp.marko(templates.livros.form, {
          livro: {},
          errosValidacao: errors.array()
        })
      }

      livroDao
        .adiciona(req.body)
        .then(resp.redirect(LivroController.routes().lista))
        .catch(erro => console.log(erro))
    }
  }

  editar() {
    return function(req, resp) {
      console.log(req.body)
      const livroDao = new LivroDao(db)

      livroDao
        .atualiza(req.body)
        .then(resp.redirect(LivroController.routes().lista))
        .catch(erro => console.log(erro))
    }
  }

  apagar() {
    return function(req, resp) {
      const id = req.params.id

      const livroDao = new LivroDao(db)
      livroDao
        .remove(id)
        .then(() => resp.status(200).end())
        .catch(erro => console.log(erro))
    }
  }
}

module.exports = LivroController
