import { Joi, Segments } from "celebrate";

export default {
  create: {
    [Segments.BODY]: {
      user_id: Joi.number().required(),
      review: Joi.string(),
      points: Joi.number(),
      product_id: Joi.number().required(),
    },
  }
};
