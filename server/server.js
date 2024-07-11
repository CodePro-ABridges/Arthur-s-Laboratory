import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/auth.js";
import cors from "cors";
import dotenv from "dotenv";

//Load enviroment variables from the .env file.
dotenv.config();

const app = express();

// Connect to database
connectDB();

//Apply middleware
app.use(cors());
app.use(express.json());

//Apply routes
app.use("/api", router);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
