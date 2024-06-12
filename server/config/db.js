import mongoose from "mongoose";
import dotenv from "dotenv";

//Load enviroment variables from the .env file.
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database");
  } catch (err) {
    console.error("Connection to database FAILED", err.message);
    process.exit(1);
  }
};

export default connectDB;
