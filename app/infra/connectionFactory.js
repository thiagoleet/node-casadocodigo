var mysql = require('mysql');

// factory method
function createDbConnection () {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'casadocodigo_nodejs'
    });
}

// wrapper
module.exports = function() {
    return createDbConnection;
}