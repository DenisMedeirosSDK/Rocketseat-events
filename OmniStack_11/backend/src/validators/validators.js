const { celebrate, Segments, Joi } = require('celebrate');

const validators = {

  sessionPost: celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required()
    })
  }),
  ongsPost: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string()
        .required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string()
        .required(),
      uf: Joi.string()
        .required()
        .length(2),

    })
  }),
  profileGet: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown()
  }),
  incidentsGet: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  incidentsPost: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required().max(256),
      value: Joi.string().required(),
    })

  }),
  incidentsDelete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    })
  })


}

module.exports = validators;