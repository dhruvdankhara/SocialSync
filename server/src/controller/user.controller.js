import yup from "yup";

import { UserRolesEnum } from "../constants.js";
import User from "../model/user.model.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { ApiError, handleApiError } from "../util/errorHandler.js";

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    const schema = yup.object().shape({
      password: yup.string().min(8).required(),
      email: yup.string().email().required(),
      username: yup.string().min(3).required(),
      name: yup.string().required(),
    });

    await schema.validate({ name, username, email, password });

    const existingUser = await User.findOne({
      $or: [{ username }, { email: email.toLowerCase() }],
    });

    if (existingUser) {
      throw new ApiError(409, "user with email or username already exist.");
    }

    const newUser = await User.create({
      name,
      username,
      email: email.toLowerCase(),
      password,
      role: role || UserRolesEnum.USER,
    });

    if (!newUser) {
      throw new ApiError(500, "something went wrong while creating user.");
    }

    const token = newUser.generateAccessToken();

    const response = new ApiResponse(201, newUser, "User created successfully");
    return res
      .status(response.statusCode)
      .cookie("token", token)
      .json(response);
  } catch (error) {
    return handleApiError(error, res);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(username || email)) {
      throw new ApiError(400, "username or email is required");
    }

    if (!password) {
      throw new ApiError(400, "password is required");
    }

    const user = await User.findOne({
      $or: [{ username }, { email: email.toLowerCase() }],
    });

    if (!user) {
      throw new ApiError(404, "User not found. Please register first.");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid password");
    }

    const token = user.generateAccessToken();

    const response = new ApiResponse(
      200,
      { user, token },
      "user logged in successfully"
    );
    return res
      .status(response.statusCode)
      .cookie("token", token)
      .json(response);
  } catch (error) {
    return handleApiError(error, res);
  }
};

export { registerUser, loginUser };
