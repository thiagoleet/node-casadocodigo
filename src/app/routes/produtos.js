module.exports = function (app) {
    app.get('/produtos', function (req, res) {
        console.log("Listando produtos");
        res.render("produtos/lista");
    });
}