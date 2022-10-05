module.exports = {
    name: 'remove',
    aliases: ['rm'],
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
        if (!args[0]) {
          return message.channel.send(`${client.emotes.error} | Please provide queue number to remove!`)
        }
        const num = Number(args[0])
        if (isNaN(num) || num >= queue.songs.length || num <= 0) {
          return message.channel.send(`${client.emotes.error} | Please enter a valid number!`)
        }
        const song = queue.songs[num]
        queue.songs.splice(num, 1)
        message.channel.send(`${client.emotes.queue} | \`${num}.${song.name}\` has been removed from queue by ${song.user}`)
      }
    }