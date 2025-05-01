const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  minDamage: { type: Number, required: true },
  maxDamage: { type: Number, required: true },
  criticalChance: { type: Number, default: 0.1 }, // 10% base critical chance
  criticalMultiplier: { type: Number, default: 2 }, // 2x damage on critical
  accuracy: { type: Number, default: 1.0 }, // Base accuracy (1.0 = 100%)
  rarity: { 
    type: String, 
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  weaponClass: {
    type: String,
    enum: ['melee', 'ranged', 'magic'],
    required: true
  }
});

module.exports = mongoose.model('Weapon', weaponSchema); 