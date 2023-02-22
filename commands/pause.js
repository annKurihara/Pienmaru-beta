const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')

module.exports = {
  name: 'pause',
  aliases: ['pause', 'hold'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      let embed = new EmbedBuilder()
        .setColor(config.color.error)
        .setDescription(
            `There is nothing playing right now!`
        )
      return message.channel.send({ embeds: [embed]})  
    }
    if (queue.paused) {
      queue.resume()
      return message.react(config.emoji.play)
    }
    queue.pause()
    return message.react(config.emoji.pause)
  }
}
