"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const prisma_1 = require("./prisma/prisma");
let port;
if (process.argv.length > 2 &&
    process.argv[2] &&
    process.argv[2].startsWith("--port="))
    port = process.argv[2].split("=")[1];
else
    port = process.env.PORT || 3001;
if (typeof port === "string")
    port = parseInt(port);
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
    },
});
httpServer.on("listening", () => {
    console.log(`Server listening on port: ${port}`);
});
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
        io.sockets.emit("createdMessage", message);
        yield (0, prisma_1.createMessage)(message);
    }));
    socket.on("newUser", (userMessage) => __awaiter(void 0, void 0, void 0, function* () {
        io.sockets.emit("newUser", userMessage);
        (0, prisma_1.createMessage)(userMessage);
        socket.emit("oldMessages", yield (0, prisma_1.getMessages)());
    }));
});
httpServer.listen(port);
