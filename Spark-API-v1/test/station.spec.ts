import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import stationModel from '../src/models/station';

chai.use(chaiHttp);

describe('showAllStations', () => {
    it('should return a list of all stations', async () => {
        const res = {
            status: sinon.stub().returns({ send: sinon.stub() }),
        };

        const next = sinon.stub();

        await stationModel.showAllStations(res as any, next as any);

        expect(res.status.calledWith(200)).to.be.true;
    });
});
