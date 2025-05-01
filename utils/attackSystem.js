// utils/attackSystem.js
function checkAttackLevelUp(player, weaponClass) {
  let leveledUp = false;
  let skillField, xpField, nextLevelField;

  // Determine which fields to use based on weapon class
  switch (weaponClass) {
    case 'melee':
      skillField = 'meleeSkill';
      xpField = 'meleeXp';
      nextLevelField = 'nextMeleeLevelXp';
      break;
    case 'ranged':
      skillField = 'rangedSkill';
      xpField = 'rangedXp';
      nextLevelField = 'nextRangedLevelXp';
      break;
    case 'magic':
      skillField = 'magicSkill';
      xpField = 'magicXp';
      nextLevelField = 'nextMagicLevelXp';
      break;
    default:
      return false;
  }

  while (player[xpField] >= player[nextLevelField]) {
    player[xpField] -= player[nextLevelField];
    player[skillField]++;
    player[nextLevelField] = Math.floor(player[nextLevelField] * 1.5); // Increase XP needed each level
    leveledUp = true;
  }

  return leveledUp;
}

// Calculate damage multiplier based on skill level
function calculateDamageMultiplier(skillLevel) {
  // Base multiplier is 1.0, increases by 0.1 per level
  return 1.0 + (skillLevel - 1) * 0.1;
}

module.exports = { checkAttackLevelUp, calculateDamageMultiplier }; 