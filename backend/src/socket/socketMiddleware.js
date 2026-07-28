import jwt from "jsonwebtoken";

export const socketAuthMiddleware = (
  socket,
  next
) => {
  try {
    const cookieHeader =
      socket.handshake.headers.cookie || "";

    const cookies = Object.fromEntries(
      cookieHeader
        .split(";")
        .map((c) => c.trim().split("="))
    );

    const token = cookies.token;

    if (!token) {
      return next(
        new Error("Authentication required")
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    socket.userId = decoded.userId;

    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
};