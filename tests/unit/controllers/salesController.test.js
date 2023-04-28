const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');

describe('Controller Tests', () => {
  describe('Sales list', () => {
    afterEach(() => sinon.restore());
    it('Status 200 & list', async () => {

      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findAllSales')
        .resolves([
          [
            {
              "saleId": 1,
              "date": "2023-04-28T17:50:47.000Z",
              "productId": 1,
              "quantity": 5
            },
          ],
        ]);

      await salesController.findAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([
        [
          {
            "saleId": 1,
            "date": "2023-04-28T17:50:47.000Z",
            "productId": 1,
            "quantity": 5
          },
        ],
      ]);
    });
  });

  describe('Sale Search', () => {
    afterEach(() => sinon.restore());
    it('Status 200 & data', async () => {

      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'findSalesById')
        .resolves([
          [
            {
              "saleId": 1,
              "date": "2023-04-28T17:50:47.000Z",
              "productId": 1,
              "quantity": 5
            },
          ],
        ]);

      await salesController.findSalesById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([
        [
          {
            "saleId": 1,
            "date": "2023-04-28T17:50:47.000Z",
            "productId": 1,
            "quantity": 5
          },
        ],
      ]);
    });

    it('Non-existing id', async () => {

      const res = {};
      const req = {
        params: { id: 37 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'findSalesById')
        .resolves({ message: 'Sale not found' });

      await salesController.findSalesById(req, res);

      // expect(res.status).to.have.been.calledWith(404);

      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });

  /* describe('Insert tests', function () {
    afterEach(() => sinon.restore());
    it('Insert ok', async function () {

      const res = {};
      const req = {
        body: {
          name: "Excalibur"
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'insert')
        .resolves({
          "id": 1,
          "name": "Excalibur"
        });

      await salesController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        "id": 1,
        "name": "Excalibur"
      });
    });

    it('Name < 5', async () => {

      const res = {};
      const req = {
        body: {
          name: 'Oi',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'insert')
        .resolves({
          type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long',
        });

      await salesController.insert(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

  }); */
});