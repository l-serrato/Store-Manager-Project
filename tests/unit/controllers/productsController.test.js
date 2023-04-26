const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');

describe('Teste de unidade do productsController', function () {
  describe('Products list', function () {
    it('Status 200 & list', async function () {
      // arrange
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

      // act
      await productsController.findAll(req, res);

      // assert
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

  describe('Product Search', function () {
    it('Status 200 & data', async function () {
      // Arrange
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

      // Act
      await productsController.findById(req, res);

      // Assert
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

    /* it('ao passar um id inválido deve retornar um erro', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 'abc' }, // passamos aqui um id inválido para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Definimos o dublê do service retornando o contrato definido.
      sinon
        .stub(productsService, 'findById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      // Act
      await productsController.getPassenger(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 422
      expect(res.status).to.have.been.calledWith(422);
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith('"id" must be a number');
    }); */

    it('Non-existing id', async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 37 }, // passamos aqui um id fictício para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Definimos o dublê do service retornando o contrato definido para esse cenário
      sinon
        .stub(productsService, 'findById')
        .resolves({ message: 'Product not found' });

      // Act
      await productsController.findById(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 404
      expect(res.status).to.have.been.calledWith(404);
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith('Product not found');
    });
  });
});