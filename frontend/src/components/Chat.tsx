import { useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { v4 as uuidv4 } from "uuid";
import { Message, NewUserMessage } from "../util/types";
import { sendUserMessageToServer } from "../util/websocket";
import { MessageComponent } from "./MessageComponent";
import { MessageSend } from "./MessageSend";

interface IChatProps {
  user: string;
  messages: (Message | NewUserMessage)[];
  setMessages: (messages: (Message | NewUserMessage)[]) => void;
}

export function Chat(props: IChatProps) {
  const messageRef = useRef<null | HTMLInputElement>(null);

  function sendMessage(message: string) {
    sendUserMessageToServer({
      id: uuidv4(),
      text: message,
      user: props.user,
      timestamp: new Date().getTime(),
    });

    scrollToBottom();
  }

  function scrollToBottom() {
    messageRef.current?.scrollIntoView({ behavior: "smooth", inline: "end" });
  }

  return (
    <div className="bg-zinc-800 absolute left-1/2 -translate-x-1/2 text-zinc-100 flex flex-col justify-center rounded-lg h-[90vh] w-[90vw] shadow-md">
      <div className="m-3 overflow-y-auto w-[calc(100%-1.5rem)] h-[75vh] absolute top-5 bg-zinc-700 rounded-md shadow-md">
        <ScrollToBottom
          className="w-full h-full"
          initialScrollBehavior="smooth"
        >
          {props.messages.map((message) => (
            <MessageComponent
              className="mt-2 mb-2 ml-2 mr-2"
              key={message.id}
              user={props.user}
              message={message}
            />
          ))}
        </ScrollToBottom>
      </div>
      <div className="flex justify-center items-center w-full absolute bottom-1">
        <MessageSend sendMessage={sendMessage} />
      </div>
    </div>
  );
}
