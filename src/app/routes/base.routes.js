// Controllers -> Classes
const BaseController = require('../controllers/base.controller')

// Controller -> Objects
const controller = new BaseController()

module.exports = app => {
  const routes = BaseController.routes()

  app.get(routes.home, controller.home())

  app
    .route(routes.login)
    .get(controller.login())
    .post(controller.efetuaLogin())
}
