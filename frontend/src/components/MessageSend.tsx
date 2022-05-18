import { PaperPlaneTilt } from "phosphor-react";
import { useState } from "react";
import Twemoji from "react-twemoji";

interface IMessageSendProps {
  sendMessage: (message: string) => void;
}

export function MessageSend({ sendMessage }: IMessageSendProps) {
  const placeholders = ["Hello world!", "What a beautiful day..."];
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const [text, setText] = useState("");

  function randomPlaceHolder() {
    setPlaceholder(
      placeholders[Math.floor(Math.random() * placeholders.length)]
    );
  }
  return (
    <div className="w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(text);
        }}
        className="flex flex-row justify-center items-center flex-grow mb-1 w-full"
      >
        <input
          type="text"
          name="message"
          placeholder={placeholder}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value === "" || e.target.value === " ") {
              randomPlaceHolder();
            }
          }}
          value={text}
          className="placeholder-zinc-400  text-zinc-100 border-zinc-600 bg-transparent rounded-l-md focus:border-blue-500 focus:ring-blue-500 focus:ring-1 focus:outline-none text-center h-12 w-[calc(100%-10rem)] shadow-md"
        ></input>
        <button
          type="submit"
          disabled={text === "" || text === " "}
          className="rounded-r-md aspect-square flex justify-center items-center bg-gradient-to-tr from-blue-600 to-blue-300 h-12 disabled:to-gray-600 disabled:from-gray-600 transition-colors duration-1000 shadow-md"
        >
          <PaperPlaneTilt weight="bold" className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
}
