const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')

module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave', 'x'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    queue.stop()
    let embed = new EmbedBuilder()
            .setColor(config.color.error)
            .setDescription(
                `Queue stopped!`
            )
      message.channel.send({ embeds: [embed]})
  }
}
