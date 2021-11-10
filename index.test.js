const request = require('supertest');
const express = require('express');

const app = express();

describe('Date API', () => {

    it('GET /api/1 --> Days between two dates', () => {
        return request(app)
        .get('/api/1')
        .expect('Content-Type', /json/)
        .expect(200)
    });


    it('GET /api/2 --> Weekdays between two dates', () => {});

    it('GET /api/3 --> Complete weeks between two dates', () => {});

});
