import os
from dotenv import load_dotenv
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes

# Load environment variables
load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

if not TOKEN:
    print("Error: TELEGRAM_BOT_TOKEN is not set in .env file.")
    exit(1)

# Define the /start command handler
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    chat_id = update.effective_chat.id
    web_app_url = "https://snake-game-nine-nu.vercel.app/"

    # Create an inline keyboard with a Web App button
    keyboard = [
        [InlineKeyboardButton("Play the Snake Game", web_app={"url": web_app_url})]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    # Send the message with the inline keyboard
    await update.message.reply_text(
        "Click the button below to play the Snake Game!",
        reply_markup=reply_markup
    )

def main():
    # Initialize the Application
    application = Application.builder().token(TOKEN).build()

    # Add command handlers
    application.add_handler(CommandHandler("start", start))

    # Start polling
    print("Bot is running...")
    application.run_polling()

if __name__ == "__main__":
    main()
