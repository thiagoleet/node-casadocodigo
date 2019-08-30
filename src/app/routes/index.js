// Controllers -> Classes
const LivroController = require('../controllers/livro.controller')
const BaseController = require('../controllers/base.controller')

// Controller -> Objects
const livroController = new LivroController()
const baseController = new BaseController()

// Models -> Classes
const Livro = require('../models/livro')

module.exports = app => {
  const routesBase = BaseController.routes()
  const routesLivro = LivroController.routes()

  app.get(routesBase.home, baseController.home())

  app.get(routesLivro.lista, livroController.lista())

  app
    .route(routesLivro.cadastro)
    .get(livroController.formCadastro())
    .post(Livro.validacoes(), livroController.cadastrar())
    .put(Livro.validacoes(), livroController.editar())

  app.get(routesLivro.edicao, livroController.formEdicao())

  app.delete(routesLivro.delecao, livroController.apagar())
}
