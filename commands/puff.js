const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('puff').setDescription('Puff the za'),
  async execute(interaction) {
    interaction.reply(`${interaction.user} takes a puff of their joint.`);
  }
};
