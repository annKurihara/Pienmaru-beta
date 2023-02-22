const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')

module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
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
    const song = queue.songs[0]
    let embed = new EmbedBuilder()
      .setColor(config.color.info)
      .setDescription(
        `I'm playing **\`${song.name}\`** requested by ${song.user}`
      )
    return message.channel.send({ embeds: [embed]})
  }
}
