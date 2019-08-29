const app = require('./src/config/custom-express')

app.listen(3000, function() {
  console.info('Servidor inciado na porta 3000')
})

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
  res.send(`
<html>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <h1> Livros </h1>
        </body>
    </html>
`)
})
