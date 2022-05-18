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
exports.getMessages = exports.createMessage = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
function createMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
        message.timestamp = String(message.timestamp);
        if (String(Object.entries(message)).includes("userConnected")) {
            message = message;
            message.timestamp = String(message.timestamp);
            yield exports.prisma.messages.create({
                data: {
                    id: message.id,
                    userConnected: true,
                    user: message.user,
                    timestamp: message.timestamp,
                },
            });
        }
        else {
            message = message;
            message.timestamp = String(message.timestamp);
            yield exports.prisma.messages.create({
                data: {
                    id: message.id,
                    text: message.text,
                    user: message.user,
                    timestamp: message.timestamp,
                },
            });
        }
    });
}
exports.createMessage = createMessage;
function getMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        const fetchedMessages = yield exports.prisma.messages.findMany();
        const messages = fetchedMessages.map((message) => {
            if (message.userConnected) {
                return {
                    id: message.id,
                    userConnected: true,
                    user: message.user,
                    timestamp: Number(message.timestamp),
                };
            }
            else {
                return {
                    id: message.id,
                    text: message.text,
                    user: message.user,
                    timestamp: Number(message.timestamp),
                };
            }
        });
        return messages;
    });
}
exports.getMessages = getMessages;
