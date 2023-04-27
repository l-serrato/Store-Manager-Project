const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const productsMock = require('./mocks/products.mock');

describe('Model Tests', () => {
  describe('Succes', () => {
    afterEach(() => sinon.restore());
    it('findAll w/ data', async () => {
      sinon.stub(connection, 'execute').resolves([productsMock.productsMock]);

      const result = await productsModel.findAll();

      expect(result).to.be.an('array');
      expect(result).to.have.length(2);
      expect(result[0]).to.contain.keys(['id', 'name']);
    });

    it('findAll no data', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);

      const result = await productsModel.findAll();

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });

    it('findById w/ data', async () => {
      sinon.stub(connection, 'execute').resolves([productsMock.productsMockId]);

      const result = await productsModel.findById(1);

      expect(result).to.be.an('object');
      expect(result).to.contain.keys(['id', 'name']);
    });

    it('findById no data', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);

      const result = await productsModel.findById();

      expect(result).to.be.equal(undefined);
    });

    it('Insert test', async () => {
      const product = {
        "name": "Excalibur"
      };

      sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

      const result = await productsModel.insert(product);

      expect(result).to.deep.equal({ id: 42, name: 'Excalibur' });
    });
  });
});