const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  minDamage: { type: Number, required: true },
  maxDamage: { type: Number, required: true },
  criticalChance: { type: Number, default: 0.1 }, // 10% base critical chance
  criticalMultiplier: { type: Number, default: 2 }, // 2x damage on critical
  rarity: { 
    type: String, 
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    default: 'common'
  }
});

module.exports = mongoose.model('Weapon', weaponSchema); 