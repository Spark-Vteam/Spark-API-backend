import express, { Request, Response } from "express";
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import invoiceModel from '../src/models/invoice';

chai.use(chaiHttp);

describe('showAllInvoices', () => {
    it('should return a list of all invoices', async () => {
        const res = {
            status: sinon.stub().returns({ send: sinon.stub() }),
        };

        const next = sinon.stub();

        await invoiceModel.showAllInvoices(res as any, next as any);

        expect(res.status.calledWith(200)).to.be.true;
        
    });
});
