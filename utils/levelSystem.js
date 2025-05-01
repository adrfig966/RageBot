// utils/levelSystem.js
function checkLevelUp(player) {
    let leveledUp = false;
  
    while (player.xp >= player.nextLevelXp) {
      player.xp -= player.nextLevelXp;
      player.level++;
      player.nextLevelXp = Math.floor(player.nextLevelXp * 1.5); // Increase XP needed each level
      leveledUp = true;
    }
  
    return leveledUp;
  }
  
  module.exports = { checkLevelUp };
  