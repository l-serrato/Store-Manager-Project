const { expect } = require('chai');
const { sinon } = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');

describe('Model Tests', () => {
  describe('Succes', () => {
    afterEach(() => sinon.restore());
    it('findAll w/ data', async () => {
      sinon.stub(connection, 'execute').resolves([
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

      const result = await productsModel.findAll();

      expect(result).to.be.an('array');
      expect(result).to.have.length(2);
    });

    it('findAll no data', async () => {
      sinon.stub(connection, 'execute').resolves([]);

      const result = await productsModel.findAll();

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });

    it('findById w/ data', async () => {
      sinon.stub(connection, 'execute').resolves([
        [
          {
            "id": 1,
            "name": "Martelo de Thor"
          },
        ],
      ]);

      const result = await productsModel.findById(1);

      expect(result).to.be.an('array');
      expect(result).to.have.length(1);
    });

    it('findById no data', async () => {
      sinon.stub(connection, 'execute').resolves([]);

      const result = await productsModel.findById(37);

      expect(result).to.be.an('array');
      expect(result).to.have.length(0);
    });
  });
});