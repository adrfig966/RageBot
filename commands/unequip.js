const { SlashCommandBuilder } = require('discord.js');
const { getOrCreatePlayer } = require('../utils/getOrCreatePlayer');
const Player = require('../models/Player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unequip')
    .setDescription('Unequip your current weapon'),
  async execute(interaction) {
    const playerData = await getOrCreatePlayer(interaction.user);
    const player = await Player.findById(playerData._id).populate('equippedWeapon');

    if (!player.equippedWeapon) {
      return interaction.reply('You don\'t have any weapon equipped!');
    }

    const weaponName = player.equippedWeapon.name;
    player.equippedWeapon = null;
    await player.save();

    interaction.reply(`You have unequipped ${weaponName}!`);
  }
};
