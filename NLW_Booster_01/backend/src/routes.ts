import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';

import PointController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const pointController = new PointController();
const itemsController = new ItemsController();

const routes = Router();
const upload = multer(multerConfig);

routes.get('/items', itemsController.index);

routes.get('/points', pointController.index);
routes.get('/points/:id', pointController.show);
routes.post(
  '/points',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().lowercase().required(),
        uf: Joi.string().uppercase().max(2).required(),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    },
  ),
  pointController.create,
);

export default routes;
