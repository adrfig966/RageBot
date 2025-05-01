const { SlashCommandBuilder } = require('discord.js');
const Player = require('../models/Player');

module.exports = {
  data: new SlashCommandBuilder().setName('register').setDescription('Register as a new player'),
  async execute(interaction) {
    const existing = await Player.findOne({ discordId: interaction.user.id });
    if (existing) return interaction.reply({ content: 'You are already registered!', ephemeral: true });

    await new Player({
      discordId: interaction.user.id,
      username: interaction.user.username
    }).save();

    interaction.reply('You are now registered!');
  }
};
