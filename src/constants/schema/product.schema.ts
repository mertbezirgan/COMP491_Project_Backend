import { Joi, Segments } from "celebrate";

export default {
  create: {
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      weight: Joi.number().required(),
      price: Joi.number().required(),
      bundle_price: Joi.number().required(),
      token: Joi.object({
        token_address: Joi.string().required(),
        mint_address: Joi.string().required(),
        image_url: Joi.string().required(),
      }),
      skus: Joi.array().items(
        Joi.object({
          size: Joi.string().required(), //TODO add enum validation
          stock: Joi.number().required(),
        }).required()
      ),
      images: Joi.array().items(
        Joi.object({
          url: Joi.string().required(),
          altText: Joi.string().required(),
        }).required()
      ),
    },
  },
  get: {
    [Segments.BODY]: {},
  },
  list: {
    [Segments.BODY]: {
      limit: Joi.number().required(),
      offset: Joi.number().required(),
      minPrice: Joi.number(),
      maxPrice: Joi.number(),
      sortBy: Joi.string(),
      notPurchased: Joi.boolean(),
    },
  },
};
