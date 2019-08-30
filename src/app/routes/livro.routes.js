// Controllers -> Classes
const LivroController = require('../controllers/livro.controller')

// Controller -> Objects
const controller = new LivroController()

// Models -> Classes
const Livro = require('../models/livro')

module.exports = app => {
  const routesLivro = LivroController.routes()

  app.get(routesLivro.lista, controller.lista())

  app
    .route(routesLivro.cadastro)
    .get(controller.formCadastro())
    .post(Livro.validacoes(), controller.cadastrar())
    .put(Livro.validacoes(), controller.editar())

  app.get(routesLivro.edicao, controller.formEdicao())

  app.delete(routesLivro.delecao, controller.apagar())
}
