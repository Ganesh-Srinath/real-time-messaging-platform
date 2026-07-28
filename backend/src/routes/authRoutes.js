import express from "express";
import {
  getMe,
  loginUser,
  registerUser,
  logoutUser
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/me",
  authMiddleware,
  getMe
);

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.post(
  "/logout",
  logoutUser
);

export default router;