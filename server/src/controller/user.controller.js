import { UserRolesEnum } from "../constants.js";
import User from "../model/user.model.js";
import { ApiResponse } from "../util/ApiResponse.js";
import { ApiError, handleApiError } from "../util/errorHandler.js";

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ApiError(409, "user with email or username already exist.");
    }

    const newUser = await User.create({
      name,
      username,
      email,
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

export { registerUser };
