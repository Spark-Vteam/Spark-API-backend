import chai from "chai";
import chaiHttp from 'chai-http';

import "mocha";

const server = require('../src/index');

chai.should();

chai.use(chaiHttp);

describe('Reports', () => {
    describe('GET /station', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/station")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    // res.body.data.should.be.an("array");
                    // res.body.data.length.should.be.above(0);
                    done();
                });
        });
    });
});

