import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `You are a smart personal assistant who answers asked questions
          You have access to follwing tools :
          1. searchWeb({query}) : {query: string} //Search the latest information and realtime data on the internet`,
      },
      {
        role: "user",
        content: "When was Iphone 17 launched?",
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "webSearch",
          description:
            "Search the latest information and realtime data on the internet",
          parameters: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "The search query to perform search on.",
              },
              required: ["query"],
            },
          },
        },
      },
    ],
    tool_choice: "auto",
  });
  console.log(completion.choices[0].message);
}

main();
