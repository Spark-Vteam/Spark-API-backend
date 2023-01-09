import { expect } from 'chai';
import { Response } from 'express';
import request from 'supertest';

import server from '../Spark-API-v1/src/app'; // your express app

describe('GET /main', () => {
    it('should return welcome message', async (done) => {
        const response: Response = await request(server).get('/v1/').set('host', 'localhost:4001');
        expect(response.body).haveOwnProperty('title', 'Welcome to the ${sitename}');
        done();
    });
});
