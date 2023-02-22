const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')

module.exports = {
  name: 'removelast',
  aliases: ['u', 'undo'],
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
    const removed = queue.songs.pop()
    let embed = new EmbedBuilder()
      .setColor(config.color.queue)
      .setDescription(
        ` \`${removed.name}\` cancelled from queue.`
      )
    message.channel.send({ embeds: [embed]})
  }
}