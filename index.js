
const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const { default: axios } = require("axios");
dotenv.config()

const TOKEN = process.env.BOT_TOKEN
    

const bot = new TelegramBot(TOKEN,{polling:true})

bot.on("message", (msg)=>{
    const text = msg.text;

    console.log("message received ", text);

    bot.sendMessage(msg.chat.id, "you said: " + text)
    
})

bot.onText(/\/start/,(msg)=>{
    bot.sendMessage(msg.chat.id, "hello! i am a bot, write /joke to get random jokes")
})


bot.onText(/\/joke/, async (msg)=>{
    const joke = await axios.get("https://official-joke-api.appspot.com/jokes/random")

    const setup = joke.data.setup;
    const punchline = joke.data.punchline

    bot.sendMessage(msg.chat.id, setup + " " + punchline)
})