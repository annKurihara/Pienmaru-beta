const { DisTube } = require('distube')
const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require('discord.js')
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
    console.log(`${client.user.tag} is ready to play music.`)
})

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return
    if (!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    if (!cmd) return
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

const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
        queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
        }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
    .on('playSong', (queue, song) => {
        // queue.textChannel.send(
        //     `${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${
        //     song.user
        //     }\n${status(queue)}`
        // )
        let embed = new EmbedBuilder()
            .setColor(embedColor.play)
            .setDescription(
                `${client.emotes.play} Playing [${song.name}](${song.url}) - \`${song.formattedDuration}\``
            )
        queue.textChannel.send({ embeds: [embed]})

        // fs.writeFile("songdata.json", song, function(err) {
        //     if(err) {
        //         return console.log(err);
        //     }
        //     console.log("The songfile was saved!");
        // })
    })
    .on('addSong', (queue, song) => {
        // queue.textChannel.send(
        //     `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
        // )
        let embed = new EmbedBuilder()
            .setColor(embedColor.queue)
            .setDescription(
                `Added [${song.name}](${song.url}) - \`${song.formattedDuration}\``
            )
        queue.textChannel.send({ embeds: [embed]})
    })
    .on('addList', (queue, playlist) =>
        queue.textChannel.send(
            `${client.emotes.success} | Added \`${playlist.name}\` playlist (${
                playlist.songs.length
            } songs) to queue\n${status(queue)}`
        )
    )
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

// // DisTubeOptions.searchSongs = true
// .on("searchResult", (message, result) => {
//     let i = 0
//     message.channel.send(
//         `**Choose an option from below**\n${result
//             .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
//             .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
//     )
// })
// .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
// .on("searchInvalidAnswer", message =>
//     message.channel.send(
//         `${client.emotes.error} | Invalid answer! You have to enter the number in the range of the results`
//     )
// )
// .on("searchDone", () => {})

client.login(config.token)