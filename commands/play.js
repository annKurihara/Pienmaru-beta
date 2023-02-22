const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')

module.exports = {
  name: 'play',
  aliases: ['p'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (!string) {
      let embed = new EmbedBuilder()
        .setColor(config.color.error)
        .setDescription(
            `Please enter a song url or query to search!`
        )
      return message.channel.send({ embeds: [embed]})  
    }
    client.distube.play(message.member.voice.channel, string, {
      member: message.member,
      textChannel: message.channel,
      message
    })
  }
}
