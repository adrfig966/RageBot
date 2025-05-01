// commands/profile.js
const { SlashCommandBuilder } = require('discord.js');
const Player = require('../models/Player');

function generateHealthBar(currentHp, maxHp = 100) {
  const barLength = 10; // Length of the health bar
  const filledLength = Math.round((currentHp / maxHp) * barLength);
  const emptyLength = barLength - filledLength;
  
  return '[' + '❤️'.repeat(filledLength) + '-'.repeat(emptyLength) + ']';
}

function generateXpBar(currentXp, nextLevelXp) {
  const barLength = 10; // Length of the XP bar
  const filledLength = Math.round((currentXp / nextLevelXp) * barLength);
  const emptyLength = barLength - filledLength;
  
  return '[' + '⭐'.repeat(filledLength) + '-'.repeat(emptyLength) + ']';
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('View your player stats'),
  async execute(interaction) {
    const player = await Player.findOne({ discordId: interaction.user.id });
    if (!player) return interaction.reply('You are not registered.');

    interaction.reply(
      `🧙 **${interaction.user}**\n` +
      `Level: ${player.level}\n` +
      `XP: ${generateXpBar(player.xp, player.nextLevelXp)} ${player.xp}/${player.nextLevelXp}\n` +
      `HP: ${generateHealthBar(player.hp)} ${player.hp}/100\n` +
      `Wins: ${player.defeats}`
    );
  }
};
