const express = require('express');
const validators = require('./validators/validators');

const OngsController = require('./controllers/OngsController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', validators.sessionPost, SessionController.store);

routes.get('/ongs', OngsController.index);

routes.post('/ongs', validators.ongsPost, OngsController.store);

routes.get('/profile', validators.profileGet, ProfileController.index);

routes.get('/incidents', validators.incidentsGet, IncidentController.index);

routes.post('/incidents', validators.incidentsPost, IncidentController.store);

routes.delete('/incidents/:id', validators.incidentsDelete, IncidentController.delete);

module.exports = routes;