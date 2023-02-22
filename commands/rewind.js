const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')

module.exports = {
  name: 'rewind',
  aliases: ['rw'],
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
      queue.seek(0)
      let embed = new EmbedBuilder()
        .setColor(config.color.info)
        .setDescription(
          `Rewinded the song from start!`
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
    if (queue.currentTime <= time) {
      queue.seek(0)
      let embed = new EmbedBuilder()
        .setColor(config.color.info)
        .setDescription(
          `Rewinded the song from start!`
        )
      return message.channel.send({ embeds: [embed]})
    } else {queue.seek((queue.currentTime - time))
      let embed = new EmbedBuilder()
        .setColor(config.color.info)
        .setDescription(
          `Rewinded the song for ${time}s!`
        )
      return message.channel.send({ embeds: [embed]})
    }
  }
}
