const { SlashCommandBuilder } = require('discord.js');
const { getOrCreatePlayer } = require('../utils/getOrCreatePlayer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('revive')
    .setDescription('Revive a player to full HP')
    .addUserOption(option =>
      option.setName('target').setDescription('The player to revive').setRequired(true)
    ),
  async execute(interaction) {
    const targetUser = interaction.options.getUser('target');
    const target = await getOrCreatePlayer(targetUser);

    if (target.hp > 0) {
      return interaction.reply(`${targetUser} is not defeated! They still have ${target.hp} HP.`);
    }

    if (target.hp === 100) {
      return interaction.reply(`${targetUser} is already at full HP!`);
    }

    target.hp = 100;
    await target.save();

    interaction.reply(`${targetUser} has been revived to full HP!`);
  }
}; 