// models/Player.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  username: String,
  xp: { type: Number, default: 0 },
  hp: { type: Number, default: 100 },
  defeats: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  nextLevelXp: { type: Number, default: 100 }, // XP needed for level 2
  equippedWeapon: { type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' },
  inventory: [{
    weapon: { type: mongoose.Schema.Types.ObjectId, ref: 'Weapon' },
    obtainedAt: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Player', playerSchema);
