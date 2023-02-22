const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')

module.exports = {
  name: 'repeat',
  aliases: ['loop', 'lp', 'rp'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) {
      let embed = new EmbedBuilder()
        .setColor(config.color.error)
        .setDescription(
            `There is nothing playing!`
        )
      return message.channel.send({ embeds: [embed]})  
    }
    
    let mode = null
    if (!args[0]) {
      mode = 1
    } else {
      switch (args[0]) {
        case 'off':
          mode = 0
          break
        case 'song':
          mode = 1
          break
        case 'queue':
          mode = 2
          break
        default:
          let embed = new EmbedBuilder()
            .setColor(config.color.error)
            .setDescription(
                "Please specify repeat mode: `off` | `song` | `queue`"
            )
          return message.channel.send({ embeds: [embed]})
      }
    }
    
    mode = queue.setRepeatMode(mode)
    mode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off'
    let embed = new EmbedBuilder()
      .setColor(config.color.info)
      .setDescription(
          `${client.emotes.repeat} \u200B Set repeat mode to \`${mode}\``
      )
    message.channel.send({ embeds: [embed]})  
  }
}
