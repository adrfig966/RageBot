// commands/profile.js
const { SlashCommandBuilder } = require('discord.js');
const Player = require('../models/Player');
const { getOrCreatePlayer } = require('../utils/getOrCreatePlayer');

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
    const player = await getOrCreatePlayer(interaction.user);

    const defenseStatus = player.defenseActive ? '🛡️ Active' : '❌ Inactive';
    const blockChance = (0.05 + (player.defenseSkill * 0.05)) * 100;

    interaction.reply(
      `🧙 **${interaction.user}**\n` +
      `Level: ${player.level}\n` +
      `XP: ${generateXpBar(player.xp, player.nextLevelXp)} ${player.xp}/${player.nextLevelXp}\n` +
      `HP: ${generateHealthBar(player.hp)} ${player.hp}/100\n` +
      `Wins: ${player.defeats}\n` +
      `\n⚔️ **Attack Skills**\n` +
      `Melee: Level ${player.meleeSkill} (${generateXpBar(player.meleeXp, player.nextMeleeLevelXp)} ${player.meleeXp}/${player.nextMeleeLevelXp})\n` +
      `Ranged: Level ${player.rangedSkill} (${generateXpBar(player.rangedXp, player.nextRangedLevelXp)} ${player.rangedXp}/${player.nextRangedLevelXp})\n` +
      `Magic: Level ${player.magicSkill} (${generateXpBar(player.magicXp, player.nextMagicLevelXp)} ${player.magicXp}/${player.nextMagicLevelXp})\n` +
      `\n🛡️ **Defense**\n` +
      `Skill Level: ${player.defenseSkill}\n` +
      `Defense XP: ${generateXpBar(player.defenseXp, player.nextDefenseLevelXp)} ${player.defenseXp}/${player.nextDefenseLevelXp}\n` +
      `Block Chance: ${blockChance.toFixed(1)}%\n` +
      `Status: ${defenseStatus}`
    );
  }
};
