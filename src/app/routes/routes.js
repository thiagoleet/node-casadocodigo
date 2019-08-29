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

  app.get('/livros/form', function(req, res, next) {
    res.marko(require('../views/livros/form/form.marko'))
  })

  app.post('/livros', function(req, res, next) {
    const livroDao = new LivroDao(db)
    livroDao
      .adiciona(req.body)
      .then(res.redirect('/livros'))
      .catch(e => console.error(e))
  })

  app.delete('/livros/:id', function(req, res, next) {
    const id = req.params.id
    const livroDao = new LivroDao(db)
    livroDao
      .remove(id)
      .then(() => res.status(200).end())
      .catch(e => console.error(e))
  })
}
