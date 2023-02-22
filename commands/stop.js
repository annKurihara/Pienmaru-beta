const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')

module.exports = {
  name: 'stop',
  aliases: ['x'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      let embed = new EmbedBuilder()
        .setColor(config.color.error)
        .setDescription(
          `There is nothing in the queue right now!`
        )
      return message.channel.send({ embeds: [embed]})  
    }
    queue.stop()
    let embed = new EmbedBuilder()
      .setColor(config.color.error)
      .setDescription(
        `Queue stopped!`
      )
    message.channel.send({ embeds: [embed]})
  }
}
