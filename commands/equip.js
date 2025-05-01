const { SlashCommandBuilder } = require('discord.js');
const { getOrCreatePlayer } = require('../utils/getOrCreatePlayer');
const Weapon = require('../models/Weapon');
const Player = require('../models/Player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('equip')
    .setDescription('Equip a weapon from your inventory')
    .addStringOption(option =>
      option.setName('weapon_name')
        .setDescription('The name of the weapon to equip')
        .setRequired(true)
    ),
  async execute(interaction) {
    const playerData = await getOrCreatePlayer(interaction.user);
    const player = await Player.findById(playerData._id).populate('inventory.weapon');
    const weaponName = interaction.options.getString('weapon_name');

    // Find the weapon in the player's inventory
    const inventoryItem = player.inventory.find(item => 
      item.weapon && item.weapon.name.toLowerCase() === weaponName.toLowerCase()
    );

    if (!inventoryItem) {
      return interaction.reply(`You don't have a weapon named "${weaponName}" in your inventory!`);
    }

    player.equippedWeapon = inventoryItem.weapon._id;
    await player.save();

    interaction.reply(`You have equipped ${inventoryItem.weapon.name}!`);
  }
}; 