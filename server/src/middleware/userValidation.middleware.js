import { ApiError, handleApiError } from "../util/errorHandler.js";
import { userRegistrationSchema } from "../validators/auth/user.validators.js";

const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        // todo: handle error message
        throw new ApiError(400, error.message);
      }
      next();
    } catch (error) {
      handleApiError(error, res);
    }
  };
};

export const validateUserRegistration = validateRequest(userRegistrationSchema);
