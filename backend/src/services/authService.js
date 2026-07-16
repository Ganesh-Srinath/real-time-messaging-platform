import {
  findByEmail,
  findByUsername,
  findById,
  createUser,
} from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export const register = async (userData) => {

  const {
    username,
    email,
    password,
  } = userData;

  const existingUsername =
    await findByUsername(username);

  if (existingUsername) {
    throw new Error(
      "Username already exists"
    );
  }

  const existingEmail =
    await findByEmail(email);

  if (existingEmail) {
    throw new Error(
      "Email already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

  const user = {
    id: uuid(),
    username,
    email,
    password: hashedPassword,
  };

  await createUser(user);

  return {
    message:
      "User registered successfully",
  };

};

export const currentUser = async (userId) => {

  const user =
    await findById(userId);

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };

};

export const login = async (userData) => {

  const {
    identifier,
    password,
  } = userData;

  let user;

  if (identifier.includes("@")) {
    user =
      await findByEmail(identifier);
  } else {
    user =
      await findByUsername(identifier);
  }

  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const passwordMatches =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!passwordMatches) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    token,
  };

};