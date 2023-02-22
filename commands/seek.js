const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')

module.exports = {
  name: 'forward',
  aliases: ['ff', 'seek'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      let embed = new EmbedBuilder()
        .setColor(config.color.error)
        .setDescription(
          `There is nothing in the queue right now!`
        )
      return message.channel.send({ embeds: [embed]})
    }
    if (!args[0]) {
      let embed = new EmbedBuilder()
        .setColor(config.color.error)
        .setDescription(
          `Please provide time (in seconds) to go forward!`
        )
      return message.channel.send({ embeds: [embed]})
    }
    const time = Number(args[0])
    if (isNaN(time)) {
      let embed = new EmbedBuilder()
        .setColor(config.color.error)
        .setDescription(
          `Please enter a valid time in seconds!`
        )
      return message.channel.send({ embeds: [embed]})
    }

    queue.seek((queue.currentTime + time))
    let embed = new EmbedBuilder()
      .setColor(config.color.info)
      .setDescription(
        `Fast forwarded the song for ${time}s!`
      )
    message.channel.send({ embeds: [embed]})
  }
}
