import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = {
      userId: decoded.userId,
    };

    next();

  } catch {

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;