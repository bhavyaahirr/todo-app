import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoute from "../backend/routes/todo.route.js";
import userRoute from "../backend/routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();

const PORT = process.env.PORT || 4002;
const DB_URI = process.env.MONGODB_URI;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL, // allow all origins
  credentials: true,  // allow sending cookies when making requests to the API from the browser
  methods: "GET, POST, PUT, DELETE" , // allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"]  // allow specific headers
})); //enable cors for cross-origin requests

// database connection code
try{
  await mongoose.connect(DB_URI);
  console.log("connected to mongodb");
}catch(error)
{
  console.log(error);
}

//routes

app.use("/todo",todoRoute);
app.use("/user",userRoute);


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);;
})