import { Joi, Segments } from "celebrate";
import { size } from "../enums";

export default {
  create: {
    [Segments.BODY]: {
      item_price: Joi.number().required(),
      tax: Joi.number(),
      total_price: Joi.number().required(),
      sku_id: Joi.number().required(),
      user_id: Joi.number().required(),
      address_id: Joi.number().required(),
    },
  },
};
