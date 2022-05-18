import { createServer } from "http";
import { Server } from "socket.io";
import { createMessage, getMessages } from "./prisma/prisma";
import { Message, NewUserMessage } from "./types";

let port!: string | number;
if (
  process.argv.length > 2 &&
  process.argv[2] &&
  process.argv[2].startsWith("--port=")
)
  port = process.argv[2].split("=")[1];
else port = process.env.PORT || 3001;
if (typeof port === "string") port = parseInt(port);


const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

httpServer.on("listening", () => {
  console.log(`Server listening on port: ${port}`);
})

io.on("connection", (socket) => {
  socket.on("message", async (message: Message) => {
    io.sockets.emit("createdMessage", message);
    await createMessage(message);
  });

  socket.on("newUser", async (userMessage: NewUserMessage) => {
    io.sockets.emit("newUser", userMessage);
    createMessage(userMessage);
    socket.emit("oldMessages", await getMessages());
  });
});

httpServer.listen(port)