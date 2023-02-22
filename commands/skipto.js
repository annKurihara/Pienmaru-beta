const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')

module.exports = {
  name: 'skipto',
  aliases: ['jump', 'j'],
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
            `Please provide queue number!`
        )
      return message.channel.send({ embeds: [embed]})  
    }
    const num = Number(args[0])
    if (isNaN(num) || num <= 0 ||  num >= (queue.songs.length)) {
      let embed = new EmbedBuilder()
        .setColor(config.color.error)
        .setDescription(
            `Please enter a valid number!`
        )
      return message.channel.send({ embeds: [embed]})  
    }
    await client.distube.jump(message, num).then(song => {
      let embed = new EmbedBuilder()
        .setColor(config.color.queue)
        .setDescription(
          `Skipped to: ${song.name}`
        )
      message.channel.send({ embeds: [embed]})
    })
  }
}
