import express, { Request, Response } from "express";
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import bikeModel from '../src/models/bike';

chai.use(chaiHttp);

describe('showAllBikes', () => {
    it('should return a list of all Bikes', async () => {
        const res = {
            status: sinon.stub().returns({ send: sinon.stub() }),
        };

        const next = sinon.stub();

        await bikeModel.showAllBikes(res as any, next as any);

        expect(res.status.calledWith(200)).to.be.true;
        
    });
});
