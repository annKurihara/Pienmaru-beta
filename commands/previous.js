const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')

module.exports = {
  name: 'previous',
  aliases: ['prev', 'b'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      let embed = new EmbedBuilder()
        .setColor(config.color.error)
        .setDescription(
          `There is no previous song!`
        )
      return message.channel.send({ embeds: [embed]})
    }
    const song = queue.previous()
    message.react(`${client.emotes.success}`)
  }
}
