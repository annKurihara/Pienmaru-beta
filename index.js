const { prefix, token } = require('./config.json');
const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const { DisTube } = require("distube");

const client = new Client({
    partials: [
      Partials.Channel, // for text channel
      Partials.GuildMember, // for guild member
      Partials.User, // for discord user
    ],
    intents: [
      GatewayIntentBits.Guilds, // for guild related things
      GatewayIntentBits.GuildMembers, // for guild members related things
      GatewayIntentBits.GuildIntegrations, // for discord Integrations
      GatewayIntentBits.GuildVoiceStates, // for voice related things
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ],
});

const distube = new DisTube(client, {
	searchSongs: 5,
	searchCooldown: 30,
	leaveOnEmpty: false,
	leaveOnFinish: false,
	leaveOnStop: false,
});



client.once('ready', () => onClientReady());
function onClientReady() {
    console.log("Pienmaru is ready!");
    client.on('messageCreate', (message) => onMessageReceived(message));
}

function onMessageReceived(message) {
    
    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const command = args.shift();

    if (message.content.toLowerCase() === 'hello') {
        message.reply("HEWWOOOOO OwO");
    } 
    else if (message.content.startsWith(prefix) && (command==='play'|| command==='p')) {
        distube
            .play(message.member.voice.channel, args.join(' '), {
                message,
                textChannel: message.channel,
                member: message.member,
            })
            .catch(err => {
                message.reply(err.message);
            });
    }
}

// Send "Now Playing" song status
    distube
	.on('playSong', (queue, song) =>
		queue.textChannel?.send(
			`Playing \`${song.name}\` - \`${
				song.formattedDuration
			}\`\nRequested by: ${song.user}`,
		),
	)

client.login(token);