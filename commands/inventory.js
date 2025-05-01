const { SlashCommandBuilder } = require('discord.js');
const { getOrCreatePlayer } = require('../utils/getOrCreatePlayer');
const Weapon = require('../models/Weapon');
const Player = require('../models/Player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('inventory')
    .setDescription('View your weapon inventory'),
  async execute(interaction) {
    const playerData = await getOrCreatePlayer(interaction.user);
    const player = await Player.findById(playerData._id).populate('inventory.weapon equippedWeapon');
    
    if (player.inventory.length === 0) {
      return interaction.reply('Your inventory is empty!');
    }

    let inventoryList = '🎒 **Your Inventory**\n';
    
    // Add equipped weapon info
    if (player.equippedWeapon) {
      const equippedWeapon = await Weapon.findById(player.equippedWeapon);
      inventoryList += `\n⚔️ **Equipped:** ${equippedWeapon.name} (${equippedWeapon.minDamage}-${equippedWeapon.maxDamage} damage, ${equippedWeapon.criticalChance * 100}% crit chance)\n`;
    }

    // Add inventory items
    inventoryList += '\n**Weapons:**\n';
    for (const item of player.inventory) {
      const weapon = await Weapon.findById(item.weapon);
      if (weapon) {
        inventoryList += `- ${weapon.name} (${weapon.minDamage}-${weapon.maxDamage} damage, ${weapon.criticalChance * 100}% crit chance)\n`;
      }
    }

    interaction.reply(inventoryList);
  }
}; 