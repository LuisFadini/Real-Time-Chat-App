import { Message, NewUserMessage } from "../util/types";
import Twemoji from "react-twemoji";

interface IMessageComponentProps {
  className?: string;
  user: string;
  message: Message | NewUserMessage;
}

export function MessageComponent({
  user,
  message,
  className,
}: IMessageComponentProps) {
  return (
    <>
      {String(Object.entries(message)).includes("userConnected")
        ? ((message = message as NewUserMessage),
          (
            <div className={`${className} flex items-center justify-center`}>
              <div
                className={`bg-zinc-500 text-zinc-100 p-2 rounded-lg min-w-[250px] text-center shadow-md`}
              >
                <Twemoji options={{ className: "twemoji" }}>
                  👋 {message.user} has joined the chat!
                </Twemoji>
              </div>
            </div>
          ))
        : ((message = message as Message),
          message.user === user ? (
            <div className={`${className} flex items-center justify-end`}>
              <div className="bg-blue-600 text-zinc-100 px-4 py-2 rounded-2xl flex flex-col shadow-md">
                <Twemoji options={{ className: "twemoji" }}>
                  {message.text}
                  <br />
                  <span className="text-[10px] text-zinc-300 text-right">
                    {message.user} -{" "}
                    {new Date(message.timestamp).toLocaleTimeString("pt-BR")}
                  </span>
                </Twemoji>
              </div>
            </div>
          ) : (
            <div className={`${className} flex items-center`}>
              <div className="bg-gray-200 text-zinc-700 px-4 py-2 rounded-2xl shadow-md">
                <Twemoji options={{ className: "twemoji" }}>
                  {message.text}
                  <br />
                  <span className="text-[10px] text-zinc-500">
                    {message.user} -{" "}
                    {new Date(message.timestamp).toLocaleTimeString("pt-BR")}
                  </span>
                </Twemoji>
              </div>
            </div>
          ))}
    </>
  );
}
