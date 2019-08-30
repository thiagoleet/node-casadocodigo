const { check } = require('express-validator/check')
// Controllers -> Classes
const LivroController = require('../../app/controllers/livro.controller')
const BaseController = require('../../app/controllers/base.controller')

// Controller -> Objects
const livroController = new LivroController()
const baseController = new BaseController()

const validacoes = [
  check('titulo')
    .isLength({ min: 5 })
    .withMessage('O título precisa ter no mínimo 5 caracteres'),
  check('preco')
    .isCurrency()
    .withMessage('O preço precisa de um valor monetário válido')
]

module.exports = app => {
  const routesBase = BaseController.routes()
  const routesLivro = LivroController.routes()

  app.get(routesBase.home, baseController.home())

  app.get(routesLivro.lista, livroController.lista())

  app.get(routesLivro.cadastro, livroController.formCadastro())

  app.get(routesLivro.edicao, livroController.formEdicao())

  app.post(routesLivro.lista, validacoes, livroController.cadastrar())

  app.put(routesLivro.lista, validacoes, livroController.editar())

  app.delete(routesLivro.delecao, livroController.apagar())
}
