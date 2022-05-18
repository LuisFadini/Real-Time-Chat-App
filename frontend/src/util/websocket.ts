import { io } from "socket.io-client";
import { Message } from "./types";

export const socket = io(process.env.WEBSOCKET_URL || "ws://localhost:3001/");

export function sendUserMessageToServer(message: Message) {
  socket.emit("message", message);
}
