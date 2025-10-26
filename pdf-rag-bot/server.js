import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { chat } from "./chat.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello to pdf-rag-bot");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(404).json({
      message: "Message is empty, Write something!!!",
    });
  }

  const result = await chat(message);

  res.status(201).json({
    message: result,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});
