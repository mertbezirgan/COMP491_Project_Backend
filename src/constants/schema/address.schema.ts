import { Joi, Segments } from "celebrate";

export default {
  create: {
    [Segments.BODY]: {
      title: Joi.string(),
      address_line_1: Joi.string(),
      address_line_2: Joi.string(),
      state: Joi.string(),
      city: Joi.string(),
      zip_code: Joi.string(),
      country: Joi.string(),
      phone_number: Joi.string(),
      user_id: Joi.number().required(),
    },
  },
};
