const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')
const embedColor = config.color

module.exports = {
  name: 'queue',
  aliases: ['q'],
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\` ${i === 0 ? `\n`: ''}`)
      .join('\n')
      let embed = new EmbedBuilder()
            .setColor(embedColor.info)
            .setDescription(
                `${client.emotes.queue}  ＊＊＊＊＊ **Server Queue** ＊＊＊＊＊\n${q}`
            )
      message.channel.send({ embeds: [embed]})
  }
}
