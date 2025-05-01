// commands/attack.js
const { SlashCommandBuilder } = require('discord.js');
const { getOrCreatePlayer } = require('../utils/getOrCreatePlayer');
const { checkLevelUp } = require('../utils/levelSystem');
const Weapon = require('../models/Weapon');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('attack')
    .setDescription('Attack another player')
    .addUserOption(option =>
      option.setName('target').setDescription('The player to attack').setRequired(true)
    ),
  async execute(interaction) {
    const attacker = await getOrCreatePlayer(interaction.user);
    const targetUser = interaction.options.getUser('target');
    const target = await getOrCreatePlayer(targetUser);

    if (attacker.hp <= 0) {
      return interaction.reply("You can't attack while you're defeated! You need to heal first.");
    }

    if (attacker.discordId === target.discordId) {
      return interaction.reply("You can't attack yourself!");
    }

    if (target.hp <= 0) {
      return interaction.reply(`${targetUser} is already defeated! You can't attack a dead enemy.`);
    }

    // Get the attacker's equipped weapon or use default unarmed stats
    let weapon = await Weapon.findById(attacker.equippedWeapon);
    let isUnarmed = false;
    
    if (!weapon) {
      // Default unarmed attack stats
      weapon = {
        name: 'unarmed',
        minDamage: 1,
        maxDamage: 5,
        criticalChance: 0.05, // 5% crit chance for unarmed
        criticalMultiplier: 1.5 // 1.5x damage on crit for unarmed
      };
      isUnarmed = true;
    }

    // Calculate base damage
    const baseDamage = Math.floor(Math.random() * (weapon.maxDamage - weapon.minDamage + 1)) + weapon.minDamage;
    
    // Check for critical hit
    const isCritical = Math.random() < weapon.criticalChance;
    const damage = isCritical ? Math.floor(baseDamage * weapon.criticalMultiplier) : baseDamage;
    
    target.hp -= damage;

    let result = `${interaction.user} ${isUnarmed ? 'punched' : 'attacked'} ${targetUser} ${isUnarmed ? 'with their fists' : `with ${weapon.name}`} for ${damage} damage${isCritical ? ' (CRITICAL HIT!)' : ''}.`;

    if (target.hp <= 0) {
      target.hp = 100;
      attacker.xp += 10;
      attacker.defeats += 1;
      result += ` ${targetUser} was defeated! +10 XP`;

      if (checkLevelUp(attacker)) {
        result += `\n🎉 ${interaction.user} leveled up to level ${attacker.level}!`;
      }
    }

    await target.save();
    await attacker.save();

    interaction.reply(result);
  }
};
