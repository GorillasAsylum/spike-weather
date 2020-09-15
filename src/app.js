import config from './config/index';
import TelegramBot from 'node-telegram-bot-api';
import {UserModel} from './models/user';
import mongoose from 'mongoose';
import Axios from 'axios';
import {CitiesModel} from './models/cities';

const startBot = () => {
  console.log('Bot has been started...');

  mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));

  const bot = new TelegramBot(config.telegramToken, {
    polling: {
      interval: 300,
      autoStart: true,
      params: {
        timeout: 10,
      },
    },
  });

  bot.on('polling_error', m => console.log(m));

  const startRegEx = /\/start/;

  bot.onText(startRegEx, function onStartText(msg) {
    const {id} = msg.chat;
    const name = msg.from.first_name;

    const newUser = UserModel({
      id,
      name,
      city: [],
    });

    UserModel.findOne({id: id}, function (err, data) {
      if (!data) {
        newUser.save();
        bot.sendMessage(
          id,
          `Привет, ${name}! В каком мы городе? Напиши название...`,
        );
      } else {
        bot.sendMessage(
          id,
          `Снова здравствуй, ${name}! В каком мы городе? Напиши название...`,
        );
      }
    });

    bot.on('message', function onSetCity(msg) {
      const text = msg.text.toLowerCase();

      if (text === 'москва') {
        CitiesModel.findOne({id: 524894}, function (err, el) {
          if (el.id === 524894) {
            const {data} = Axios.get(
              `api.openweathermap.org/data/2.5/weather?id=${el.id}&appid=${config.weatherToken}`,
            );
          }
        });
      }
    });
  });
};

startBot();
