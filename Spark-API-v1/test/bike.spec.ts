import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import 'mocha';

import server from '../src/app';
// import database from '../src/db/db';
chai.should();

chai.use(chaiHttp);

describe('Bike Route', () => {
    describe('GET /', () => {
        it('500 Not connected to DB', (done) => {
            chai.request(server)
                .get('/v1/bike')
                .end((err, res) => {
                    res.should.have.status(500);

                    done();
                });
        });
    });
});
