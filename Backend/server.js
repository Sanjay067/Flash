import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import mongoose from "mongoose";

// import Thread from './models/thread.js';

import chatRouter from './routes/chat.js';




const app = express();

app.use(cors());

// Generate text using Gemini Flash

const url = process.env.MONGODB_URL;

async function main() {
  try {
    await mongoose.connect(url);
    console.log('Connected to Db');

  } catch (err) {
    console.log('Error connecting to db :', err);
  }
}

app.use(express.json());

app.use('/api', chatRouter);

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
  main();
})
