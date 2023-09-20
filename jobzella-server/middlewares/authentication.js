import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const decodedToken = jwt.verify(
      token,
      process.env.secretKey 
    );

    req.id = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default authentication;
