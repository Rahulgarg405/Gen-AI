import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef(null);

  const chatContainer = document.querySelector("#container");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log(inputValue);
    if (!inputValue) return;
    generate(inputValue);
  };

  function generate(text) {
    // 1. append message to UI,
    // 2. Send it to LLM,
    // 3. Append response to the UI;
    const msg = document.createElement("div");
    msg.className = `my-6 bg-neutral-800 p-3 rounded-xl ml-auto max-w-fit`;
    msg.textContent = text;
    chatContainer?.appendChild(msg);
    setInputValue("");
  }

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        console.log("Enter");
      }
    };
    window.addEventListener("keyup", handleEnter);
  }, []);

  return (
    <div className="bg-neutral-900 text-white overflow-x-hidden h-screen">
      <div className="mx-auto max-w-3xl pb-44" id="container">
        {/* User messages : */}
        <div className="my-6 bg-neutral-800 p-3 rounded-xl ml-auto max-w-fit">
          Hi, how are you?
        </div>

        {/* Assistant message : */}
        <div className="max-w-fit">I am fine , how are you ?</div>

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
