const { SlashCommandBuilder } = require('discord.js');
const Player = require('../models/Player');

module.exports = {
  data: new SlashCommandBuilder().setName('leaderboard').setDescription('Show the top players'),
  async execute(interaction) {
    const top = await Player.find().sort({ xp: -1 }).limit(5);
    const list = top.map((p, i) => `${i + 1}. ${p.username} - XP: ${p.xp}, Wins: ${p.defeats}`).join('\n');
    interaction.reply(`🏆 **Leaderboard** 🏆\n${list}`);
  }
};
