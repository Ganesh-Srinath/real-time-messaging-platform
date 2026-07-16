import {
  register,
  login,
  currentUser,
} from "../services/authService.js";

export const registerUser = async (
  req,
  res
) => {

  try {

    const response =
      await register(req.body);

    return res.status(201).json(
      response
    );

  } catch (error) {

    return res.status(400).json({
      message: error.message,
    });

  }

};

export const loginUser = async (
  req,
  res
) => {

  try {

    const response =
      await login(req.body);

    return res.status(200).json(
      response
    );

  } catch (error) {

    return res.status(400).json({
      message: error.message,
    });

  }

};

export const getMe = async (
  req,
  res
) => {

  try {

    const user =
      await currentUser(
        req.user.userId
      );

    return res.status(200).json(
      user
    );

  } catch (error) {

    return res.status(404).json({
      message: error.message,
    });

  }

};