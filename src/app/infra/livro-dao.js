class LivroDao {
  constructor(db) {
    this._db = db
  }

  lista() {
    return new Promise((resolve, reject) => {
      this._db.all('SELECT * FROM livros', (error, results) => {
        if (error) {
          reject(error)
          return
        }
        return resolve(results)
      })
    })
  }

  adiciona(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `
        INSERT INTO LIVROS (
                titulo,
                preco,
                descricao
            ) values (?, ?, ?)
        `,
        [livro.titulo, livro.preco, livro.descricao],
        function(err) {
          if (err) {
            console.error(err)
            return reject('Não foi possível adicionar o livro')
          }
          resolve()
        }
      )
    })
  }
}

module.exports = LivroDao
