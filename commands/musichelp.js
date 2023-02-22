const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
  name: 'musichelp',
  aliases: ['mh', 'mhelp', 'mcmd', 'musiccmd'],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor(config.color.pien)
          .setTitle('🎵 \u200B **MUSIC HELP PAGE** \u200B 🎶')
          .setAuthor({ name: '※ Pien Corner Support Center ※', iconURL:'https://cdn.discordapp.com/attachments/836787532347473931/1024938174985809920/pn-amoeba.gif' })
          .setDescription("Here's how to PienMusic 101: UwU")
          .addFields(
            { name: '・ pn.play', value: 'alias: pn.p\n Play a song, or add to queue if currently playing a song'},
            { name: '・ pn.nowplaying', value: 'alias: pn.np\n Display the title of currently playing song'},
            { name: '・ pn.pause', value: 'Pause currently playing song'},
            { name: '・ pn.resume', value: 'alias: pn.res\n Resume paused song'},
            { name: '・ pn.queue', value: 'alias: pn.q\n Display the playlist in queue'},
            { name: '・ pn.stop', value: 'alias: pn.x\n Stop the entire playlist'},
            { name: '・ pn.previous', value: 'alias: pn.b\n Replay the previous song'},
            { name: '・ pn.skip', value: 'alias: pn.s\n Skip the currently playing song'},
            { name: '・ pn.seek [time]', value: 'alias: pn.ff\n Fast forward the song (in seconds)'},
            { name: '・ pn.rewind [time]', value: 'alias: pn.rw\n Rewind the song (in seconds)'},
            { name: '・ pn.skipto [queue_num]', value: 'alias: pn.j\n Jump to specific song from queue'},
            { name: '・ pn.remove [queue_num]', value: 'alias: pn.rm\n Remove specific song from queue'},
            { name: '・ pn.undo', value: 'alias: pn.u\n Remove last added song from queue'},
            { name: '・ pn.loop [optional: song | queue | off ]', value: 'alias: pn.lp\n Loop the song/playlist. Will loop current song if no mode specified'},
            { name: '・ pn.shuffle', value: 'Shuffle all songs in the queue'},
          )
      ]
    })
  }
}
