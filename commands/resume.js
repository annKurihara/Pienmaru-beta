const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')

module.exports = {
  name: 'resume',
  aliases: ['res', 'rs', 'unpause'],
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
    if (queue.paused) {
      queue.resume()
      return message.react(config.emoji.play)
    } else {
      let embed = new EmbedBuilder()
        .setColor(config.color.error)
        .setDescription(
            `The queue is not paused! :T`
        )
      return message.channel.send({ embeds: [embed]})
    }
  }
}
