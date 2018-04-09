var express = require('../config/express')();
var request = require('supertest')(express);
var assert = require('assert');

describe('#ProdutosController', function () {
    it('#should return as json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('#should not create a product with invalid date', function (done) {
        request.post('/produtos')
            .send({ titulo: '', descricao: 'novo livro' })
            .expect(400, done);
    });

    it('#should create a product invalid date', function (done) {
        request.post('/produtos')
            .send({ titulo: 'titulo', descricao: 'novo livro', preco: 20.5 })
            .expect(302, done);
    });
});