import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import apiKeyModel from '../src/models/apiKeys';

chai.use(chaiHttp);

describe('createOneApiKey', () => {
    it('should create an apiKey for a user', async () => {
        const res = {
            status: sinon.stub().returns({ send: sinon.stub() }),
        };

        const next = sinon.stub();

        const apiKeyInfo = {
            emailAdress: 'fofroridoda@hotmail.com',
            organization: 'GhostBusters',
        };

        await apiKeyModel.createOneApiKey(apiKeyInfo, res as any, next as any);

        expect(res.status.calledWith(200)).to.be.true;
    });
});
