const { expect } = require('chai');
const { sinon } = require('sinon');
const productsService = require('../../../src/models/productsService');
const productsModel = require('../../../src/models/productsModel');

describe('Service Tests', function () {
  describe('Success & failure', function () {
    it('findAll w/ data', async function () {
      // arrange
      sinon.stub(productsModel, 'findAll').resolves([
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

      // act
      const result = await productsService.findAll();

      // assert
      expect(result).to.be.an('array');
      expect(result).to.have.length(2);
      expect(result.message).to.deep.equal([
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

  describe('Product search', function () {
    /* it('Invalid ID', async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

      // act
      const result = await productsService.findById('a');

      // assert
      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    }); */

    it('Non-existing ID', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves(undefined);

      // act
      const result = await productsService.findById(37);

      // assert
      expect(result.message).to.equal('Product not found');
    });

    it('Existenting ID ', async function () {
      // arrange
      sinon.stub(productsModel, 'findById').resolves([[
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
      ],
      ]);

      // act
      const result = await productsService.findById(1);

      // assert
      expect(result.message).to.deep.equal([[
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
      ],]);
    });
  });
});