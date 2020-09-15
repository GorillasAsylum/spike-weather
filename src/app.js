import config from './config/index';
import TelegramBot from 'node-telegram-bot-api';
import {UserModel} from './models/user';
import {CitiesModel} from './models/cities';
import mongoose from 'mongoose';
import Axios from 'axios';

const startBot = async () => {
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
  // const helpRegEx = /\/help/;
  // const stopRegEx = /\/stop/;

  await bot.onText(startRegEx, msg => {
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
  });
  await bot.on('message', msg => {
    const text = msg.text.toLowerCase();
    console.log(text);

    if (text === 'москва') {
      console.log(text);
      CitiesModel.findOne({id: 524901}, function (err, el) {
        console.log(el.id);
        if (el.id) {
          const {data} = Axios.get(
            `api.openweathermap.org/data/2.5/weather?id=${el.id}&appid=${config.weatherToken}`,
          );
          console.log(data);
        } else {
          console.log('no');
        }
      });
    }
  });
};

startBot();
