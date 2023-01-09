import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import 'mocha';

import server from '../Spark-API-v1/src/app';
// import database from '../src/db/db';
chai.should();

chai.use(chaiHttp);

describe('Auth Route', () => {
    describe('GET /', () => {
        it('404 Not working', (done) => {
            chai.request(server)
                .get('/v1/auth')
                .end((err, res) => {
                    res.should.have.status(404);

                    done();
                });
        });
    });
});
