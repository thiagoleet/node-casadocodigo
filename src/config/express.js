var app = require('express')();
app.set('view engine','ejs');
app.set('views','./src/app/views');

module.exports = function() {
    return app;
}