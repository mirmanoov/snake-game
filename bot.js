require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Load token from environment variable
const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('TELEGRAM_BOT_TOKEN is missing. Check your .env file.');
  process.exit(1); // Exit if the token is not set
}

const bot = new TelegramBot(token, { polling: true });

// Handle errors
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.code, error.message);
});

// Handle messages
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const webAppUrl = 'https://snake-game-eta-jet.vercel.app/';

  // Inline Keyboard Button
  const inlineKeyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Play the Snake Game',
            web_app: { url: webAppUrl },
          },
        ],
      ],
    },
  };

  bot.sendMessage(
    chatId,
    'Click the button below to play the Snake Game!',
    inlineKeyboard
  );
});
