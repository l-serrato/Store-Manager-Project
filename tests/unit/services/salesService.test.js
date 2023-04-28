const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../src/services/salesService');
const salesModel = require('../../../src/models/salesModel');

describe('Service Tests', () => {
  describe('Success & failure', () => {
    afterEach(() => sinon.restore());
    it('findAllSales w/ data', async () => {

      sinon.stub(salesModel, 'findAllSales').resolves([
        [
          {
            "saleId": 1,
            "date": "2023-04-28T17:50:47.000Z",
            "productId": 1,
            "quantity": 5
          },
        ],
      ]);

      const result = await salesService.findAllSales();

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result).to.deep.equal([
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

  describe('Product search', () => {
    afterEach(() => sinon.restore());

    it('Non-existing ID', async function () {

      sinon.stub(salesModel, 'findSalesById').resolves(undefined);

      const result = await salesService.findSalesById(37);

      expect(result).to.equal(undefined);
    });

    it('Existing ID ', async () => {

      sinon.stub(salesModel, 'findSalesById').resolves([[
        {
          "date": "2023-04-28T17:50:47.000Z",
          "productId": 3,
          "quantity": 15
        }
      ],
      ]);

      const result = await salesService.findSalesById(2);

      expect(result).to.deep.equal([[
        {
          "date": "2023-04-28T17:50:47.000Z",
          "productId": 3,
          "quantity": 15
        }
      ],]);
    });
  });

  /* describe('Insert tests', () => {
    const product = {
      "id": 1,
      "name": "Excalibur"
    };
    const invalidValue = {
      name: 'Oi',
    };
    afterEach(() => sinon.restore());
    it('Invalid name', async () => {

      const result = await salesService.insert(invalidValue);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });

    it('Insert ok', async () => {
      sinon.stub(salesModel, 'insert').resolves(1);
      sinon.stub(salesModel, 'findSalesById').resolves(product[0]);

      const result = await salesService.insert(product);

      expect(result.type).to.equal(undefined);
      expect(result.message).to.deep.equal(product[0]);
    });

  }); */
});