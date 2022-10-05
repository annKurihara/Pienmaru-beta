module.exports = {
  name: 'rewind',
  aliases: ['rw'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    if (!args[0]) {
      queue.seek(0)
      return message.channel.send(`Rewinded the song from start!`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`${client.emotes.error} | Please enter a valid number!`)
    if (queue.currentTime <= time) {
      queue.seek(0)
      message.channel.send(`Rewinded the song from start!`)
    } else {queue.seek((queue.currentTime - time))
      message.channel.send(`Rewinded the song for ${time}s!`)}
    
  }
}
