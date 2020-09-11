import UserController from "./controllers/UserController";

const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const Axios = require("axios");
const mongoose = require("mongoose");

const $PATH =
  "mongodb+srv://Admin:KCH0E6j5O7kE3eis@cluster0.wdrvv.mongodb.net/spike-weather?retryWrites=true&w=majority";
const TELEGRAM_TOKEN = "1359387522:AAH261kFyzKmC4vN-mYsvaFfr49ziDTAMwo";
const WEATHER_TOKEN = "0dd434961d0229f4309f8401b5c244cc";

console.log("Bot has been started...");

mongoose.connect($PATH, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const bot = new TelegramBot(TELEGRAM_TOKEN, {
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
  const text = message.text;

  bot.sendMessage(id, `Привет, ${name}!`);
  const createUser = new UserController(id);
  createUser.createUser(name);
});
