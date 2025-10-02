import express from "express";
import { generate } from "./chatbot.js";

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome!!!");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  const result = await generate(message);

  res.json({
    message: result,
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening at PORT : ${PORT}`);
});
