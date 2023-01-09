import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import userModel from '../src/models/user';

chai.use(chaiHttp);

describe('showAllUsers', () => {
    it('should return a list of all users', async () => {
        const res = {
            status: sinon.stub().returns({ send: sinon.stub() }),
        };

        const next = sinon.stub();

        await userModel.showAllUsers(res as any, next as any);

        expect(res.status.calledWith(200)).to.be.true;
    });
});
