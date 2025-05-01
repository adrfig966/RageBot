// commands/attack.js
const { SlashCommandBuilder } = require('discord.js');
const { getOrCreatePlayer } = require('../utils/getOrCreatePlayer');
const { checkLevelUp } = require('../utils/levelSystem');
const { checkDefenseLevelUp } = require('../utils/defenseSystem');
const { checkAttackLevelUp, calculateDamageMultiplier } = require('../utils/attackSystem');
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
        criticalMultiplier: 1.5, // 1.5x damage on crit for unarmed
        accuracy: 1.0, // 100% accuracy for unarmed
        weaponClass: 'melee'
      };
      isUnarmed = true;
    }

    // Check for accuracy
    const accuracyRoll = Math.random();
    if (accuracyRoll > weapon.accuracy) {
      return interaction.reply(`${interaction.user} missed their attack with ${weapon.name}!`);
    }

    // Get the appropriate skill level and calculate damage multiplier
    let skillLevel;
    switch (weapon.weaponClass) {
      case 'melee':
        skillLevel = attacker.meleeSkill;
        break;
      case 'ranged':
        skillLevel = attacker.rangedSkill;
        break;
      case 'magic':
        skillLevel = attacker.magicSkill;
        break;
      default:
        skillLevel = 1;
    }

    const damageMultiplier = calculateDamageMultiplier(skillLevel);

    // Calculate base damage
    const baseDamage = Math.floor(Math.random() * (weapon.maxDamage - weapon.minDamage + 1)) + weapon.minDamage;
    
    // Apply skill-based damage multiplier
    const modifiedDamage = Math.floor(baseDamage * damageMultiplier);
    
    // Check for critical hit
    const isCritical = Math.random() < weapon.criticalChance;
    const damage = isCritical ? Math.floor(modifiedDamage * weapon.criticalMultiplier) : modifiedDamage;

    let result = `${interaction.user} ${isUnarmed ? 'punched' : 'attacked'} ${targetUser} ${isUnarmed ? 'with their fists' : `with ${weapon.name}`}`;

    // Check for defense
    if (target.defenseActive) {
      // Calculate block chance based on defense skill level (base 5% + 5% per level)
      const blockChance = 0.05 + (target.defenseSkill * 0.05);
      const isBlocked = Math.random() < blockChance;

      if (isBlocked) {
        // Successful block
        target.defenseXp += 10;
        target.defenseActive = false; // Defense stance is consumed after successful block

        // Check for defense skill level up
        if (checkDefenseLevelUp(target)) {
          result += `\n🛡️ ${targetUser}'s defense skill increased to level ${target.defenseSkill}!`;
        }

        result += `\n🛡️ ${targetUser} successfully blocked the attack!`;
      } else {
        // Failed block
        target.hp -= damage;
        target.defenseActive = false; // Defense stance is consumed even on failed block
        result += ` for ${damage} damage${isCritical ? ' (CRITICAL HIT!)' : ''}.`;
        result += `\n🛡️ ${targetUser} failed to block the attack!`;
      }
    } else {
      // No defense active
      target.hp -= damage;
      result += ` for ${damage} damage${isCritical ? ' (CRITICAL HIT!)' : ''}.`;
    }

    // Add attack XP and check for level up
    if (!isUnarmed) {
      switch (weapon.weaponClass) {
        case 'melee':
          attacker.meleeXp += 10;
          if (checkAttackLevelUp(attacker, 'melee')) {
            result += `\n⚔️ Your melee skill increased to level ${attacker.meleeSkill}!`;
          }
          break;
        case 'ranged':
          attacker.rangedXp += 10;
          if (checkAttackLevelUp(attacker, 'ranged')) {
            result += `\n🏹 Your ranged skill increased to level ${attacker.rangedSkill}!`;
          }
          break;
        case 'magic':
          attacker.magicXp += 10;
          if (checkAttackLevelUp(attacker, 'magic')) {
            result += `\n✨ Your magic skill increased to level ${attacker.magicSkill}!`;
          }
          break;
      }
    }

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
