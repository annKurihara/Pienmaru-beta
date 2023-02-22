const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ayang')
		.setDescription('[][][][][][][][][]'),
	async execute(interaction) {
		return interaction.reply('ily cinta <3');
	},
};