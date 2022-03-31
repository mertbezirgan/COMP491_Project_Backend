import { Joi, Segments } from "celebrate";
import { size } from "../enums";

export default {
  create: {
    [Segments.BODY]: {
      name: Joi.string(),
      description: Joi.string(),
      weight: Joi.number(),
      price: Joi.number(),
      bundle_price: Joi.number(),
      token: Joi.object({
        token_address: Joi.string(),
        image_url: Joi.string(),
      }),
      skus: Joi.array().items(
        Joi.object({
          size: Joi.string(), //TODO add enum validation
          stock: Joi.number(),
        })
      ),
      images: Joi.array().items(
        Joi.object({
          url: Joi.string(),
          altText: Joi.string(),
        })
      ),
    },
  },
};
