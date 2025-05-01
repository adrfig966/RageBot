const Player = require('../models/Player');

async function getOrCreatePlayer(discordUser) {
  let player = await Player.findOne({ discordId: discordUser.id });

  if (!player) {
    player = await Player.create({
      discordId: discordUser.id,
      username: discordUser.username,
      level: 1,
      xp: 0,
      nextLevelXp: 100,
      hp: 100,
      defeats: 0,
      defenseActive: false,
      defenseSkill: 1,
      defenseXp: 0,
      nextDefenseLevelXp: 100
    });
  }

  return player;
}

module.exports = { getOrCreatePlayer };
