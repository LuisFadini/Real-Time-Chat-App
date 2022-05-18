import { PrismaClient } from "@prisma/client";
import { Message, NewUserMessage } from "../types";

export const prisma = new PrismaClient();

export async function createMessage(message: NewUserMessage | Message) {
  message.timestamp = String(message.timestamp);
  if (String(Object.entries(message)).includes("userConnected")) {
    message = message as NewUserMessage;
    message.timestamp = String(message.timestamp);
    await prisma.messages.create({
      data: {
        id: message.id,
        userConnected: true,
        user: message.user,
        timestamp: message.timestamp,
      },
    });
  } else {
    message = message as Message;
    message.timestamp = String(message.timestamp);
    await prisma.messages.create({
      data: {
        id: message.id,
        text: message.text,
        user: message.user,
        timestamp: message.timestamp,
      },
    });
  }
}

export async function getMessages() {
  const fetchedMessages = await prisma.messages.findMany();

  const messages = fetchedMessages.map((message) => {
    if (message.userConnected) {
      return {
        id: message.id,
        userConnected: true,
        user: message.user,
        timestamp: Number(message.timestamp),
      };
    } else {
      return {
        id: message.id,
        text: message.text,
        user: message.user,
        timestamp: Number(message.timestamp),
      };
    }
  });

  return messages;
}
