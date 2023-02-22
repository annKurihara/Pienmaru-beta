module.exports = {
  name: 'skip',
  aliases: ['s'],
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
    if (queue.songs.length <= 1) {
      try {
        queue.stop()
        message.react(`${client.emotes.success}`)
        return
      } catch (e) {
        message.channel.send(`${client.emotes.error} | ${e}`)
      }
    }
    try {
      const song = await queue.skip()
      message.react(`${client.emotes.success}`)
    } catch (e) {
      message.channel.send(`${client.emotes.error} | ${e}`)
    }
  }
}
