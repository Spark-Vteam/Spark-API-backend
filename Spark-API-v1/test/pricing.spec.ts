import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import pricingModel from '../src/models/pricing';

chai.use(chaiHttp);

describe('showAllPricings', () => {
    it('should return a list of all pricings', async () => {
        const res = {
            status: sinon.stub().returns({ send: sinon.stub() }),
        };

        const next = sinon.stub();

        await pricingModel.showAllPricings(res as any, next as any);

        expect(res.status.calledWith(200)).to.be.true;
    });
});
