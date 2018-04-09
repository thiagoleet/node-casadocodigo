var express = require('../config/express')();
var request = require('supertest')(express);
var assert = require('assert');

describe('#ProdutosController', function () {
    it('#listagem json', function (done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);

    });
});