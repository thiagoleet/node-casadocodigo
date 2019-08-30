// Controllers -> Classes
const BaseController = require('../controllers/base.controller')

// Controller -> Objects
const controller = new BaseController()

module.exports = app => {
  const routesBase = BaseController.routes()

  app.get(routesBase.home, controller.home())
}
