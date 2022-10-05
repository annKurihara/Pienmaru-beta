module.exports = {
    name: 'removelast',
    aliases: ['u', 'undo'],
    run: async (client, message) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
        const removed = queue.songs.pop()
        message.channel.send(`${client.emotes.queue} | \`${removed.name}\` has been cancelled from queue.`)
      }
    }