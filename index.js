const { token } = require('./config.json');
const { Client, IntentsBitField, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
] });

client.once('ready', () => onClientReady());
function onClientReady() {
    console.log("Pienmaru β is ready!");
    client.on('messageCreate', (message) => onMessageReceived(message));
}

function onMessageReceived(message) {
    if (message.content.toLowerCase() === "hewwo") {
        message.reply("em bek OwO");
    }
}

client.login(token);