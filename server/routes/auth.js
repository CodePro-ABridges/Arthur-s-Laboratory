import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { importJWK, CompactEncrypt } from "jose";
import User from "../models/userSchema.js";
import Post from "../models/postSchema.js";
import dotenv from "dotenv";
import authenticateToken from "../middleware/authMiddleware.js"; // Import the middleware

// Load environment variables from the .env file.
dotenv.config();

const router = Router();

// Function to initialize encryption key
const initializedEncryptionKey = async () => {
  try {
    const key = await importJWK({
      kty: "oct",
      k: process.env.JWT_ENCRYPTION_SECRET,
    });
    console.log("Encryption key initialized");
    return key;
  } catch (err) {
    console.error("Failed to initialize encryption key", err);
    process.exit(1);
  }
};

// Initialize the encryption key
let encryptionKey;
(async () => {
  encryptionKey = await initializedEncryptionKey();
})();

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const tokenPayload = { userId: user._id };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    if (!encryptionKey) {
      return res.status(500).send({ error: "Encryption key not initialized" });
    }

    try {
      const encryptedToken = await new CompactEncrypt(
        new TextEncoder().encode(token),
      )
        .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
        .encrypt(encryptionKey);
      res.status(201).send({ token: encryptedToken });
    } catch (encryptionError) {
      console.error("Token encryption failed", encryptionError);
      res.status(500).send({ error: "Token encryption failed" });
    }
  } catch (err) {
    res.status(400).send({ error: "Registration Failed" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: "Invalid email or password" });
    }

    const tokenPayload = { userId: user._id };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    if (!encryptionKey) {
      return res.status(500).send({ error: "Encryption key not initialized" });
    }

    try {
      const encryptedToken = await new CompactEncrypt(
        new TextEncoder().encode(token),
      )
        .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
        .encrypt(encryptionKey);
      res.status(200).send({ token: encryptedToken });
    } catch (encryptionError) {
      console.error("Token encryption failed", encryptionError);
      res.status(500).send({ message: "Token encryption failed" });
    }
  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).send({ error: "Login failed" });
  }
});

// Fetch User
router.get("/fetchuser", authenticateToken, async (req, res) => {
  res.status(200).send(req.user);
});

// Fetch Posts
router.get("/getposts", async (req, res) => {
  try {
    const posts = await Post.find();
    /*    console.log("Server debug post: ", posts); */
    res.status(200).send(posts);
  } catch (err) {
    console.error("Fetch Error: ", err);
    res
      .status(500)
      .send({ error: "Internal Server error attempting to get posts" });
  }
});

// Create Post
router.post("/createpost", authenticateToken, async (req, res) => {
  // Use middleware
  const { title, body } = req.body;
  try {
    const newPost = new Post({ author: req.user._id, title, body }); // Use req.user.name as the author
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Create post error: ", err);
    res
      .status(500)
      .send({ error: "Internal server error attempting to create post" });
  }
});

// Create Comments
router.post("/createcomment", async (req, res) => {
  //
});

// Fetch Comments
router.get("/getcomments", async (req, res) => {
  //
});

export default router;
