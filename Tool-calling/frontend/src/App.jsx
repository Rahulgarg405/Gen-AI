import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const threadId = Date.now().toString(36) + Math.random().toString(36);

function App() {
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef(null);

  const chatContainer = document.querySelector("#container");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    // console.log(inputValue);
    if (!inputValue) return;
    await generate(inputValue);
  };

  const loading = document.createElement("div");
  loading.className = "my-6";
  loading.textContent = "Thinking.....";

  async function generate(text) {
    // 1. append message to UI,
    // 2. Send it to LLM,
    // 3. Append response to the UI;
    const msg = document.createElement("div");
    msg.className = `my-6 bg-neutral-800 p-3 rounded-xl ml-auto max-w-fit`;
    msg.textContent = text;
    chatContainer?.appendChild(msg);
    setInputValue("");

    chatContainer?.appendChild(loading);

    // call the server :
    const assistantMessage = await callServer(text);
    // console.log("Assistant message : ", assistantMessage);

    const assistantMessageElement = document.createElement("div");
    assistantMessageElement.className = `max-w-fit`;
    assistantMessageElement.textContent = assistantMessage;
    loading.remove();
    chatContainer?.appendChild(assistantMessageElement);
  }

  async function callServer(inputText) {
    const response = await fetch("http://localhost:3001/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ threadId, message: inputText }),
    });

    if (!response.ok) {
      throw new Error("Error generating the response");
    }

    const result = await response.json();
    return result.message;
  }

  return (
    <div className="bg-neutral-900 text-white overflow-x-hidden h-screen">
      <div className="mx-auto max-w-3xl pb-44" id="container">
        {/* User messages : */}
        {/* <div className="my-6 bg-neutral-800 p-3 rounded-xl ml-auto max-w-fit">
          Hi, how are you?
        </div> */}

        {/* Assistant message : */}
        {/* <div className="max-w-fit">I am fine , how are you ?</div> */}

        {/* Bottom Textarea input : */}
        <div className="fixed bottom-0 max-w-3xl w-full m-auto bg-neutral-900">
          <div className="bg-neutral-800 p-2 rounded-3xl  mb-7">
            <textarea
              className="outline-0 w-full resize-none p-3"
              rows="2"
              name=""
              id="input"
              ref={inputRef}
              value={inputValue}
              onChange={handleChange}
            ></textarea>
            <div className="flex items-center justify-end">
              <button
                className="bg-white px-4 py-1 text-black rounded-full cursor-pointer  hover:bg-gray-300"
                onClick={handleSubmit}
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
