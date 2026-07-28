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

export const loginUser = async (req, res) => {
  try {
    const { user, token } = await login(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login Successful",
      user,
    });
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