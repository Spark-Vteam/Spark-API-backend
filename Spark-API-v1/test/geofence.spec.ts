import express, { Request, Response } from "express";
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import geofenceModel from '../src/models/geofence';

chai.use(chaiHttp);

describe('showAllGeofences', () => {
    it('should return a list of all geofences', async () => {
        const res = {
            status: sinon.stub().returns({ send: sinon.stub() }),
        };

        const next = sinon.stub();

        await geofenceModel.showAllGeofences(res as any, next as any);

        expect(res.status.calledWith(200)).to.be.true;
        
    });
});
