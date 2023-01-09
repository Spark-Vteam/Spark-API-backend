import express, { Request, Response } from 'express';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import chargerModel from '../src/models/chargers';

chai.use(chaiHttp);

describe('showAllChargers', () => {
    it('should return a list of all chargers', async () => {
        const res = {
            status: sinon.stub().returns({ send: sinon.stub() }),
        };

        const next = sinon.stub();

        await chargerModel.showAllChargers(res as any, next as any);

        expect(res.status.calledWith(200)).to.be.true;
    });
});
