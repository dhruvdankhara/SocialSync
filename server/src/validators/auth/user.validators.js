import Joi from "joi";

const userRegistrationSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export { userRegistrationSchema };
