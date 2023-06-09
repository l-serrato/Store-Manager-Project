const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');

describe('Controller Tests', () => {
  describe('Products list', () => {
    afterEach(() => sinon.restore());
    it('Status 200 & list', async () => {

      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findAll')
        .resolves([
          [
            {
              "id": 1,
              "name": "Martelo de Thor"
            },
            {
              "id": 2,
              "name": "Traje de encolhimento"
            },
          ],
        ]);

      await productsController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([
        [
          {
            "id": 1,
            "name": "Martelo de Thor"
          },
          {
            "id": 2,
            "name": "Traje de encolhimento"
          },
        ],
      ]);
    });
  });

  describe('Product Search', () => {
    afterEach(() => sinon.restore());
    it('Status 200 & data', async () => {

      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'findById')
        .resolves([
          [
            {
              "id": 1,
              "name": "Martelo de Thor"
            },
          ],
        ]);

      await productsController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([
        [
          {
            "id": 1,
            "name": "Martelo de Thor"
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
        .stub(productsService, 'findById')
        .resolves({ message: 'Product not found' });

      await productsController.findById(req, res);

      // expect(res.status).to.have.been.calledWith(404);

      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Insert tests', function () {
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
        .stub(productsService, 'insert')
        .resolves({
            "id": 1,
            "name": "Excalibur"
          });

      await productsController.insert(req, res);

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
        .stub(productsService, 'insert')
        .resolves({
          type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long',
        });

      await productsController.insert(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });

    it('No name', async () => {

      const res = {};
      const req = {
        body: {
          name: '',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'insert')
        .resolves({
          type: 'INVALID_VALUE', message: '"name" is required',
        });

      await productsController.insert(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

  });

  describe('Remove tests', () => {
    afterEach(() => sinon.restore());
    it('Status 200 & data', async () => {
      sinon.stub(productsService, 'remove').resolves([1]);
      const req = {
        params: 1,
      };
      const res = {
        status: () => { },
        json: () => { },
      };

      sinon.stub(res, 'status').returns(res);
      sinon.stub(res, 'json').returns(null);

      const result = await productsController.remove(req, res);
      expect(result).to.be.deep.equal(null)
    })
    it('Test without sucess', async function () {
      sinon.stub(productsService, 'remove').resolves([37]);
      const req = {
        params: 1,
      };
      const res = {
        status: () => { },
        json: () => { },
      };

      sinon.stub(res, 'status').returns(res);
      sinon.stub(res, 'json').returns({ "message": "Product not found" });

      const result = await productsController.remove(req, res);
      expect(result).to.be.deep.equal({ "message": "Product not found" })
    })
  })
  });