const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const connection = require('../../../src/models/connection');
const salesMock = require('./mocks/sales.mock');

describe('Model Tests', () => {
  describe('Succes', () => {
    afterEach(() => sinon.restore());
    it('findAllSales w/ data', async () => {
      sinon.stub(connection, 'execute').resolves([salesMock.salesMock]);

      const result = await salesModel.findAllSales();

      expect(result).to.be.an('array');
      expect(result).to.have.length(3);
      expect(result[0]).to.contain.keys(['date', 'quantity']);
    });

    it('findAllSales no data', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);

      const result = await salesModel.findAllSales();

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });

    it('findSalesById w/ data', async () => {
      sinon.stub(connection, 'execute').resolves([salesMock.salesMockId]);

      const result = await salesModel.findSalesById(2);

      expect(result).to.be.an('array');
    });

    it('findSalesById no data', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);

      const result = await salesModel.findSalesById();

      expect(result).to.deep.equal([]);
    });

    /* it('Insert test', async () => {
      const product = {
        "name": "Excalibur"
      };

      sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);

      const result = await salesModel.insert(product);

      expect(result).to.deep.equal({ id: 42, name: 'Excalibur' });
    }); */
  });
});