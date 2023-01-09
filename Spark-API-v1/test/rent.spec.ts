import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import rentModel from '../src/models/rent';

chai.use(chaiHttp);

describe('showAllRents', () => {
    it('display a list of all rents', async () => {
        const res = {
            status: sinon.stub().returns({ send: sinon.stub() }),
        };

        const next = sinon.stub();

        await rentModel.showAllRents(res as any, next as any);

        expect(res.status.calledWith(200)).to.be.true;
    });
});
