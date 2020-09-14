import config from "./src/config/index";
import UserController from "./src/controllers/UserController";

const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");

async function startBot() {
  console.log("Bot has been started...");

  await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));

  const bot = new TelegramBot(config.telegramToken, {
    polling: {
      interval: 300,
      autoStart: true,
      params: {
        timeout: 10,
      },
    },
  });

  bot.on("polling_error", (m) => console.log(m));

  bot.on("message", (message) => {
    const { id } = message.chat;
    const name = message.from.first_name;
    bot.sendMessage(id, `Привет, ${name}!`);

    const newUser = new UserController();
    newUser.createUser(id, name);
  });
}

startBot();
