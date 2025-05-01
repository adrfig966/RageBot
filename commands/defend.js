const { SlashCommandBuilder } = require('discord.js');
const { getOrCreatePlayer } = require('../utils/getOrCreatePlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('defend')
    .setDescription('Activate your defense stance to block the next attack'),
  async execute(interaction) {
    const player = await getOrCreatePlayer(interaction.user);

    if (player.defenseActive) {
      return interaction.reply('Your defense stance is already active!');
    }

    if (player.hp <= 0) {
      return interaction.reply("You can't defend while you're defeated! You need to heal first.");
    }

    player.defenseActive = true;
    await player.save();

    interaction.reply(`${interaction.user} takes a defensive stance! Their defense skill level is ${player.defenseSkill}.`);
  }
}; 