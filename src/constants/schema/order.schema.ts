import { Joi, Segments } from "celebrate";
import { size } from "../enums";

export default {
  create: {
    [Segments.BODY]: {
      item_price: Joi.number().required(),
      tax: Joi.number(),
      total_price: Joi.number().required(),
      status: Joi.number(),
      sku_id: Joi.number().required(),
      user_id: Joi.number().required(),
      address: Joi.string(),
    },
  },
  get: {
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      weight: Joi.number().required(),
      price: Joi.number().required(),
      bundle_price: Joi.number().required(),
      token: Joi.object({
        token_address: Joi.string().required(),
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
};
