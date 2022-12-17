import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import 'mocha';

import server from '../src/index';
import database from '../src/db/db';
chai.should();

chai.use(chaiHttp);

describe('Database', () => {
    before(async () => {
        const db = await database.getDb();
        console.log('HAAAAAALLLOOOOOO');

        console.log('Db', db);
        // db.connect() {
        //     if (err) {
        //         done(err);
        //         return;
        //     }
        //     expect(result).to.equal('SQL CONNECT SUCCESSFUL.');
        //     done();
        // });
    });
});

describe('Station Route', () => {
    describe('GET /', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get('/station')
                .end((err, res) => {
                    // console.log(res);

                    done();
                });
        });
    });
});
