const Discord = require('discord.js')

module.exports = {
  name: 'help',
  aliases: ['h', 'cmd', 'command'],
  run: async (client, message) => {
    message.channel.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setColor('#ffcc00')
          .setTitle('**PIENMARU HELP PAGE DESU OwO**')
          .setAuthor({ name: '※ Pien Corner Support Center ※', iconURL:'https://cdn.discordapp.com/attachments/836787532347473931/1024938174985809920/pn-amoeba.gif' })
          .setDescription('Pienmaru here! Below is the list of things I could do:')
          .addFields(
            { name: '■ Default prefix is "pn."', value: '\u200B'},
            { name: '・ pn.[music commands]', value: client.commands.map(cmd => `\`${cmd.name}\``).join(', ')},
            { name: '・ pn pats [mentions]', value: 'Give someone warm headpats. UwU'}
          )
      ]
    })
  }
}
