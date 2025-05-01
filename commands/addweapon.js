const { SlashCommandBuilder } = require('discord.js');
const Weapon = require('../models/Weapon');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addweapon')
    .setDescription('Add a new weapon to the game (Admin only)')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('The name of the weapon')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('description')
        .setDescription('The description of the weapon')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('min_damage')
        .setDescription('Minimum damage')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('max_damage')
        .setDescription('Maximum damage')
        .setRequired(true)
    )
    .addNumberOption(option =>
      option.setName('critical_chance')
        .setDescription('Critical hit chance (0-1)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('rarity')
        .setDescription('Weapon rarity')
        .setRequired(true)
        .addChoices(
          { name: 'Common', value: 'common' },
          { name: 'Uncommon', value: 'uncommon' },
          { name: 'Rare', value: 'rare' },
          { name: 'Epic', value: 'epic' },
          { name: 'Legendary', value: 'legendary' }
        )
    )
    .addStringOption(option =>
      option.setName('weapon_class')
        .setDescription('The class of the weapon')
        .setRequired(true)
        .addChoices(
          { name: 'Melee', value: 'melee' },
          { name: 'Ranged', value: 'ranged' },
          { name: 'Magic', value: 'magic' }
        )
    )
    .addNumberOption(option =>
      option.setName('accuracy')
        .setDescription('Accuracy (0-1)')
        .setRequired(true)
    ),
  async execute(interaction) {
    // Check if user is admin (you can modify this check based on your needs)
    if (interaction.user.id !== process.env.ADMIN_ID) {
      return interaction.reply('You do not have permission to use this command!');
    }

    const weapon = await Weapon.create({
      name: interaction.options.getString('name'),
      description: interaction.options.getString('description'),
      minDamage: interaction.options.getInteger('min_damage'),
      maxDamage: interaction.options.getInteger('max_damage'),
      criticalChance: interaction.options.getNumber('critical_chance'),
      rarity: interaction.options.getString('rarity'),
      weaponClass: interaction.options.getString('weapon_class'),
      accuracy: interaction.options.getNumber('accuracy')
    });

    interaction.reply(`Added new weapon: ${weapon.name}`);
  }
}; 