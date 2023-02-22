const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
  name: 'help',
  aliases: ['h', 'cmd', 'command'],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor(config.color.pien)
          .setTitle('**PIENMARU HELP PAGE DESU OwO**')
          .setAuthor({ name: '※ Pien Corner Support Center ※', iconURL:'https://cdn.discordapp.com/attachments/836787532347473931/1024938174985809920/pn-amoeba.gif' })
          .setThumbnail('https://cdn.discordapp.com/attachments/836787532347473931/1023774583498743818/pn-piending.gif')
          .setDescription('Pienmaru here! Below is the list of things I could do: \n \u200B ■ \u200B Default prefix is `pn.`')
          .addFields(
            { name: '・ [music commands]', value: 'Type `pn.musichelp` or `pn.mh` for details!'},
            { name: '・ pn.pats [mentions]', value: 'Give someone warm headpats. UwU'},
            { name: '・ pn.cats', value: "I'll send you cat pics!"},
            { name: '・ pn.joke', value: 'Make you smile with my dad jokes.'},
            { name: '・ pn.meme', value: 'Supply you with fresh memes.'},
          )
      ]
    })
  }
}
