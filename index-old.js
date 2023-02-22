const { DisTube } = require('distube')
const { ActivityType, Client, Collection, GatewayIntentBits, EmbedBuilder } = require('discord.js')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

const fs = require('fs')
const config = require('./config.json')
const prefix = config.prefix
const embedColor = config.color

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ]
})

client.config = require('./config.json')
client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin({
            emitEventsAfterFetching: true
        }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ]
})
client.commands = new Collection()
client.aliases = new Collection()
client.emotes = config.emoji

fs.readdir('./commands/', (err, files) => {
    if (err) return console.log('Could not find any commands!')

    const jsFiles = files.filter(f => f.split('.').pop() === 'js')
    if (jsFiles.length <= 0) return console.log('Could not find any commands!')
  
    jsFiles.forEach(file => {
        const cmd = require(`./commands/${file}`)
        console.log(`Loaded ${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})

client.on('ready', () => {
    console.log(`${client.user.tag} is online!`)
    client.user.setStatus("online");
    client.user.setActivity(
        "with mommy OwO"
        //"Mom working OwO", 
        //{ type: ActivityType.Watching }
        );
})

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return
    if (!message.content.startsWith(prefix)) {
        onMagicWords(message) 
        return
    } 

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))


    if (!cmd || cmd === undefined) {
        onMagicCommand(message) 
        return
    } 
    if (cmd.inVoiceChannel && !message.member.voice.channel) {
        return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    }
    try {
        cmd.run(client, message, args)
    } catch (e) {
        console.error(e)
        message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
    }
})

// const status = queue =>
//     `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
//         queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
//         }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
    .on('playSong', (queue, song) => {
        let embed = new EmbedBuilder()
            .setColor(embedColor.play)
            .setDescription(
                `${client.emotes.play} Playing [${song.name}](${song.url}) - \`${song.formattedDuration}\``
            )
        queue.textChannel.send({ embeds: [embed]})
    })
    .on('addSong', (queue, song) => {
        let embed = new EmbedBuilder()
            .setColor(embedColor.queue)
            .setDescription(
                `Added [${song.name}](${song.url}) - \`${song.formattedDuration}\``
            )
        queue.textChannel.send({ embeds: [embed]})
    })
    .on('addList', (queue, playlist) => {
        let embed = new EmbedBuilder()
            .setColor(embedColor.queue)
            .setDescription(
                `Added playlist: \`${playlist.name}\` (${playlist.songs.length} songs) to queue`
            )
        queue.textChannel.send({ embeds: [embed]})
    })
    .on('error', (queue, e) => {
        if (queue.textChannel) {
            let embed = new EmbedBuilder()
            .setColor(embedColor.error)
            .setDescription(
                `I got an error! ;A; | ${e.toString().slice(0, 1974)}`
            )
        queue.textChannel.send({ embeds: [embed]})
        } else console.error(e)
    })
    .on('empty', queue => {
        let embed = new EmbedBuilder()
            .setColor(embedColor.info)
            .setDescription(`I left the channel since no one here ;-;`)
        queue.textChannel.send({ embeds: [embed]})
    })
    .on('searchNoResult', (message, query) =>
        message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`)
    )
    .on('finish', queue => {
        let embed = new EmbedBuilder()
            .setColor(embedColor.info)
            .setDescription(`End of song queue! Otsukare~ UwU`)
        queue.textChannel.send({ embeds: [embed]})
    })

    async function onMagicWords(message) {
        var magicWord = message.content.toLowerCase()
        let reactPien = '🥺'
                const customPien = message.guild.emojis.cache.find(emoji => 
                    emoji.name === 'pieeennn');
                if (customPien !== undefined) {
                   reactPien = customPien
                }
        switch (magicWord) {
            case 'pien':
            case 'pn':
                message.react(reactPien);
              break
            case 'gg':
                message.reply('ez')
              break
        }
    }

    async function onMagicCommand(message) {
        const args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);
        const feat = args.shift().toLowerCase();
        if (feat === "pats" || feat === "pat") {
            const patter = message.author;
            const patObject = args.join(' ')
            const patObjectCount = message.mentions.users.size
                
            let patterId = patter.id.toString()
                patterId = `<@${patterId}>`
            let patDesc 
            let patPic

            if (patObjectCount >=2) {
                patDesc = `Whoa calm down ${patter}, pat your nibbas one by one!`
                patPic = "https://cdn.discordapp.com/attachments/836787532347473931/993412372901408838/hamster-shocked.gif"
            }
            else if (patObject === undefined || patterId === patObject) {
                patDesc = `${patter} just patted themself out of loneliness! ;w;`
                patPic = "https://cdn.discordapp.com/attachments/836787532347473931/993366450825859142/unknown.png"
            }
            else if (patObject) {
                patDesc = `${patter} pats ${patObject}! UwU`
                patPic = "https://cdn.discordapp.com/attachments/836787532347473931/993350614111240192/780860668898574347.gif"
            }
            let embed = new EmbedBuilder()
                .setColor("#ffcc00")
                .setDescription(patDesc)
                .setImage(patPic)
            message.reply({ embeds: [embed] })
        }
    }

client.login(config.token)