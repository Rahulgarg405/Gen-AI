import Groq from "groq-sdk";
import { vectorStore } from "./index.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function chat(question) {
  const relevantChunks = await vectorStore.similaritySearch(question, 8);

  const context = relevantChunks.map((chunk) => chunk.pageContent).join("\n\n");

  const SYSTEM_PROMPT = `You are an assistant for question-answering tasks. Use the following relevant pieces of retrieved context to answer the question. If you don't know the answer, say I don't know`;

  const userQuery = `Question: ${question}
    Relevant Context: ${context}
    Answer: `;

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: userQuery,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
  // console.log(`Assistant: ${completion.choices[0].message.content}`);
  return completion.choices[0].message.content;
}

// chat();
