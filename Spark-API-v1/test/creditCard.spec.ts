import express, { Request, Response } from "express";
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import sinon from 'sinon';
import creditCardModel from '../src/models/creditcard';

chai.use(chaiHttp);

describe('getCard', () => {
    it('should return one creditCard', async () => {
        const res = {
            status: sinon.stub().returns({ send: sinon.stub() }),
        };
        const cardId = "1";
        const next = sinon.stub();

        await creditCardModel.getCard(cardId, res as any, next as any);

        expect(res.status.calledWith(200)).to.be.true;
        
    });
});
