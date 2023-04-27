const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/productsService');
const productsModel = require('../../../src/models/productsModel');

describe('Service Tests', () => {
  describe('Success & failure', () => {
    afterEach(() => sinon.restore());
    it('findAll w/ data', async () => {

      sinon.stub(productsModel, 'findAll').resolves([
        [
          {
            "id": 1,
            "name": "Martelo de Thor"
          },
        ],
      ]);

      const result = await productsService.findAll();

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
      expect(result).to.deep.equal([
        [
          {
            "id": 1,
            "name": "Martelo de Thor"
          },
        ],
      ]);
    });
  });

  describe('Product search', () => {
    afterEach(() => sinon.restore());

    it('Non-existing ID', async function () {

      sinon.stub(productsModel, 'findById').resolves(undefined);

      const result = await productsService.findById(37);

      expect(result).to.equal(undefined);
    });

    it('Existing ID ', async () => {

      sinon.stub(productsModel, 'findById').resolves([[
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
      ],
      ]);

      const result = await productsService.findById(1);

      expect(result).to.deep.equal([[
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
      ],]);
    });
  });
});