import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config();

export default {
  databaseURL: process.env.MONGODB_PATH,
  telegramToken: process.env.TELEGRAM_TOKEN,
  weatherToken: process.env.WEATHER_TOKEN,
};
