// utils/defenseSystem.js
function checkDefenseLevelUp(player) {
  let leveledUp = false;

  while (player.defenseXp >= player.nextDefenseLevelXp) {
    player.defenseXp -= player.nextDefenseLevelXp;
    player.defenseSkill++;
    player.nextDefenseLevelXp = Math.floor(player.nextDefenseLevelXp * 1.5); // Increase XP needed each level
    leveledUp = true;
  }

  return leveledUp;
}

module.exports = { checkDefenseLevelUp }; 