const { EmbedBuilder } = require('discord.js')
const config = require('../config.json')

module.exports = {
    name: 'remove',
    aliases: ['rm'],
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
                `Please provide queue number to remove!`
            )
          return message.channel.send({ embeds: [embed]})
        }
        const num = Number(args[0])
        if (isNaN(num) || num >= queue.songs.length || num <= 0) {
          let embed = new EmbedBuilder()
            .setColor(config.color.error)
            .setDescription(
                `Please enter a valid number!`
            )
          return message.channel.send({ embeds: [embed]})
        }
        const song = queue.songs[num]
        queue.songs.splice(num, 1)
        let embed = new EmbedBuilder()
          .setColor(config.color.error)
          .setDescription(
            ` \`${num}.${song.name}\` has been removed from queue by ${song.user}`
          )
        message.channel.send({ embeds: [embed]})
      }
    }