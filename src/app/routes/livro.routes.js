// Controllers -> Classes
const LivroController = require('../controllers/livro.controller')

// Controller -> Objects
const controller = new LivroController()

// Models -> Classes
const Livro = require('../models/livro')

module.exports = app => {
  const routes = LivroController.routes()

  app.get(routes.lista, controller.lista())

  app
    .route(routes.cadastro)
    .get(controller.formCadastro())
    .post(Livro.validacoes(), controller.cadastrar())
    .put(Livro.validacoes(), controller.editar())

  app.get(routes.edicao, controller.formEdicao())

  app.delete(routes.delecao, controller.apagar())
}
