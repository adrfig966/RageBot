const mongoose = require('mongoose');
const Weapon = require('./models/Weapon');
require('dotenv').config();

const initialWeapons = [
  // Common weapons
  {
    name: "Wooden Sword",
    description: "A basic sword made of wood",
    minDamage: 3,
    maxDamage: 7,
    criticalChance: 0.1,
    rarity: "common"
  },
  {
    name: "Rusty Dagger",
    description: "An old, rusted dagger",
    minDamage: 2,
    maxDamage: 6,
    criticalChance: 0.15,
    rarity: "common"
  },
  {
    name: "Stone Hammer",
    description: "A heavy hammer made of stone",
    minDamage: 4,
    maxDamage: 8,
    criticalChance: 0.05,
    rarity: "common"
  },

  // Uncommon weapons
  {
    name: "Iron Sword",
    description: "A well-crafted iron sword",
    minDamage: 5,
    maxDamage: 10,
    criticalChance: 0.12,
    rarity: "uncommon"
  },
  {
    name: "Steel Dagger",
    description: "A sharp steel dagger",
    minDamage: 4,
    maxDamage: 9,
    criticalChance: 0.18,
    rarity: "uncommon"
  },
  {
    name: "Iron Mace",
    description: "A heavy iron mace",
    minDamage: 6,
    maxDamage: 12,
    criticalChance: 0.08,
    rarity: "uncommon"
  },

  // Rare weapons
  {
    name: "Silver Sword",
    description: "A gleaming silver sword",
    minDamage: 7,
    maxDamage: 14,
    criticalChance: 0.15,
    rarity: "rare"
  },
  {
    name: "Crystal Dagger",
    description: "A dagger made of magical crystal",
    minDamage: 6,
    maxDamage: 13,
    criticalChance: 0.2,
    rarity: "rare"
  },
  {
    name: "Dragonbone Hammer",
    description: "A hammer crafted from dragon bones",
    minDamage: 8,
    maxDamage: 16,
    criticalChance: 0.1,
    rarity: "rare"
  },

  // Epic weapons
  {
    name: "Frost Blade",
    description: "A sword imbued with ice magic",
    minDamage: 10,
    maxDamage: 18,
    criticalChance: 0.18,
    rarity: "epic"
  },
  {
    name: "Shadow Dagger",
    description: "A dagger that seems to absorb light",
    minDamage: 9,
    maxDamage: 17,
    criticalChance: 0.25,
    rarity: "epic"
  },
  {
    name: "Thunder Hammer",
    description: "A hammer that crackles with electricity",
    minDamage: 12,
    maxDamage: 20,
    criticalChance: 0.15,
    rarity: "epic"
  },

  // Legendary weapons
  {
    name: "Excalibur",
    description: "The legendary sword of kings",
    minDamage: 15,
    maxDamage: 25,
    criticalChance: 0.2,
    rarity: "legendary"
  },
  {
    name: "Soul Reaper",
    description: "A dagger said to steal souls",
    minDamage: 14,
    maxDamage: 24,
    criticalChance: 0.3,
    rarity: "legendary"
  },
  {
    name: "Mjolnir",
    description: "The hammer of the gods",
    minDamage: 18,
    maxDamage: 28,
    criticalChance: 0.25,
    rarity: "legendary"
  }
];

async function seedWeapons() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing weapons
    await Weapon.deleteMany({});
    console.log('Cleared existing weapons');

    // Insert new weapons
    await Weapon.insertMany(initialWeapons);
    console.log('Successfully seeded weapons');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding weapons:', error);
    process.exit(1);
  }
}

seedWeapons(); 