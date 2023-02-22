const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../config.json')

module.exports = {
    data: new SlashCommandBuilder()
		.setName('patme')
		.setDescription('For those who needs comfort'),
        
        async execute(interaction) {
            const patter = interaction.user.id;
            const patPic = "https://media.tenor.com/E6fMkQRZBdIAAAAC/kanna-kamui-pat.gif"
            const patDesc = `There, there, <@${patter}>... you'll be fine UwU`

                let embed = new EmbedBuilder()
                    .setColor(config.color.pien)
                    .setDescription(patDesc)
                    .setImage(patPic)
                
                return interaction.reply({ embeds: [embed] })
        }
}