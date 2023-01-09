import express, { Request, Response } from "express";
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import adminModel from '../src/models/admin';

chai.use(chaiHttp);

describe('showAllAdmins', () => {
    it('should return a list of all admins', async () => {
        const res = {
            status: sinon.stub().returns({ send: sinon.stub() }),
        };

        const next = sinon.stub();

        await adminModel.showAllAdmins(res as any, next as any);

        expect(res.status.calledWith(200)).to.be.true;
        
    });
});
