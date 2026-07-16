import jwt from "jsonwebtoken";

export const socketAuthMiddleware = (
  socket,
  next
) => {

  try {

    const token =
      socket.handshake.auth?.token;

    if (!token) {
      return next(
        new Error(
          "Authentication required"
        )
      );
    }

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    socket.userId =
      decoded.userId;

    next();

  } catch {

    next(
      new Error(
        "Invalid token"
      )
    );

  }

};