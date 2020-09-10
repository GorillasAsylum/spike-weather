const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "";

console.log("Bot has been started...");

const bot = new TelegramBot(TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10,
    },
  },
});

bot.on("message", (message) => {
  const { id } = message.chat;
  bot.sendMessage(id, `Привет, ${message.from.first_name}!`);
});
