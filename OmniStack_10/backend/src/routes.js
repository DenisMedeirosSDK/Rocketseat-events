const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.put('/devs/:id', DevController.update);
routes.delete('/devs/:id', DevController.destroy);

routes.get('/search', SearchController.index);


module.exports = routes;


//Metodos HTTP: GET, POST, PUT, DELETE

//Tipos de parametros:

//Query Params: req.query (Filtros, ordenação, paginação, ....)
//Route Params: req.params(Identificar um recurso na alteração ou remoção)
//Body: req.body(Dados para a criação ou alteração de um registro)