import chai from 'chai';
import chaiHttp from 'chai-http';

import 'mocha';

import server from '../src/app';

chai.should();

chai.use(chaiHttp);

describe("Main", () => {
    describe("GET /", () => {
        it("200 HAPPY PATH", (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);

                    done();
                });
        });
    });
});
