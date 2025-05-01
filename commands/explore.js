const { SlashCommandBuilder } = require('discord.js');
const { getOrCreatePlayer } = require('../utils/getOrCreatePlayer');
const Weapon = require('../models/Weapon');

// Rarity chances (out of 100)
const RARITY_CHANCES = {
  common: 40,    // 40% chance
  uncommon: 25,  // 25% chance
  rare: 15,      // 15% chance
  epic: 10,      // 10% chance
  legendary: 5   // 5% chance
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('explore')
    .setDescription('Explore the area for potential weapons'),
  async execute(interaction) {
    const player = await getOrCreatePlayer(interaction.user);
    
    // Roll for finding a weapon (60% chance to find nothing)
    if (Math.random() > 0.6) {
      return interaction.reply('You explored the area but found nothing of interest.');
    }

    // Determine which rarity to find
    const roll = Math.random() * 100;
    let foundRarity = null;
    let cumulativeChance = 0;

    for (const [rarity, chance] of Object.entries(RARITY_CHANCES)) {
      cumulativeChance += chance;
      if (roll <= cumulativeChance) {
        foundRarity = rarity;
        break;
      }
    }

    // Find a random weapon of the determined rarity
    const weapons = await Weapon.find({ rarity: foundRarity });
    if (weapons.length === 0) {
      return interaction.reply('You found something interesting, but it disappeared before you could grab it!');
    }

    const foundWeapon = weapons[Math.floor(Math.random() * weapons.length)];

    // Add the weapon to player's inventory
    player.inventory.push({
      weapon: foundWeapon._id,
      obtainedAt: new Date()
    });
    await player.save();

    interaction.reply(
      `🎉 You found a ${foundRarity} weapon!\n` +
      `**${foundWeapon.name}**\n` +
      `Damage: ${foundWeapon.minDamage}-${foundWeapon.maxDamage}\n` +
      `Critical Chance: ${(foundWeapon.criticalChance * 100).toFixed(1)}%\n` +
      `Description: ${foundWeapon.description}`
    );
  }
}; 