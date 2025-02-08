import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import { compactDecrypt, importJWK } from "jose";
import { createSecretKey } from "crypto";
import dotenv from "dotenv";

dotenv.config();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    // Load encryption key
    const key = createSecretKey(
      Buffer.from(process.env.JWT_ENCRYPTION_SECRET, "utf8"),
    );

    // Decrypt the token
    const { plaintext } = await compactDecrypt(token, key);

    // Verify the decrypted token
    const decoded = jwt.verify(
      new TextDecoder().decode(plaintext),
      process.env.JWT_SECRET,
    );

    // Fetch user and attach to request object
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) return res.sendStatus(404);

    next();
  } catch (err) {
    console.error("Authentication Error: ", err);
    res.sendStatus(403);
  }
};

export default authenticateToken;
