const db = require('../../config/database')
const LivroDao = require('../infra/livro-dao')

module.exports = app => {
  app.get('/', function(req, res, next) {
    res.send(`
        <html>
        <head>
        <meta charset="utf-8">
        </head>
        <body>
        <h1> Casa do Código </h1>
        </body>
        </html>
        `)
  })

  app.get('/livros', function(req, res, next) {
    const livroDao = new LivroDao(db)
    livroDao
      .lista()
      .then(livros => {
        res.marko(require('../views/livros/lista/lista.marko'), {
          livros
        })
      })
      .catch(e => console.error(e))
  })
}
