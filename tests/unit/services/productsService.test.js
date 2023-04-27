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
            "id": 2,
            "name": "Traje de encolhimento"
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
          {
            "id": 2,
            "name": "Traje de encolhimento"
          },
        ],
      ]);
    });
  });

  describe('Product search', () => {
    afterEach(() => sinon.restore());

    it('Non-existing ID', async function () {

      sinon.stub(productsModel, 'findById').resolves([]);

      const result = await productsService.findById(37);

      expect(result).to.equal({ message: 'Product not found' });
    });

    it('Existenting ID ', async () => {

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