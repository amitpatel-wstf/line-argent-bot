"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
// Replace 'YOUR_BOT_TOKEN' with your bot's API token from BotFather
const token = process.env.BOT_TOKEN || "";
// Create a bot instanceLQitdRSw4Me6c1BPv8bbtkqBA
// const bot = new TelegramBot(token, { polling: true });
const bot = new node_telegram_bot_api_1.default(token, {
    polling: true,
    testEnvironment: true,
});
// Command to handle messages
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    // Basic response
    if (text === "/start") {
        bot.sendMessage(chatId, "Welcome! How can I assist you today?", {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "Open App",
                            url: "t.me/argentx_wallet_bot/argentx",
                        },
                    ],
                ],
            },
            parse_mode: "HTML",
        });
    }
    else {
        bot.sendMessage(chatId, `You said: ${text}`);
    }
});
// Additional command for handling specific bot functions
bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const response = match[1]; // the captured group of the regex
    bot.sendMessage(chatId, `Echoing: ${response}`);
});
bot.onText(/\/options/, (msg) => {
    const chatId = msg.chat.id;
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Option 1", callback_data: "1" }],
                [{ text: "Option 2", callback_data: "2" }],
            ],
        },
    };
    bot.sendMessage(chatId, "Choose an option:", options);
});
bot.on("callback_query", (callbackQuery) => {
    const message = callbackQuery.message;
    const option = callbackQuery.data;
    bot.sendMessage(message.chat.id, `You selected option ${option}`);
});
