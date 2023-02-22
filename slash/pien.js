const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pien')
		.setDescription('Pien together with you'),
	async execute(interaction) {
		return interaction.reply('Pien!');
	},
};