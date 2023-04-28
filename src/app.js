const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.findAll);

app.get('/products/:id', productsController.findById);

app.post('/products', productsController.insert);

app.put('/products/:id', productsController.update);

app.delete('/products/:id', productsController.remove);

app.post('/sales', salesController.insertSales);

app.get('/sales', salesController.findAllSales);

app.get('/sales/:id', salesController.findSalesById);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;