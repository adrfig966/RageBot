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
    accuracy: 1.0,
    rarity: "common",
    weaponClass: "melee"
  },
  {
    name: "Rusty Dagger",
    description: "An old, rusted dagger",
    minDamage: 2,
    maxDamage: 6,
    criticalChance: 0.15,
    accuracy: 1.0,
    rarity: "common",
    weaponClass: "melee"
  },
  {
    name: "Stone Hammer",
    description: "A heavy hammer made of stone",
    minDamage: 4,
    maxDamage: 8,
    criticalChance: 0.05,
    accuracy: 1.0,
    rarity: "common",
    weaponClass: "melee"
  },
  {
    name: "Wooden Bow",
    description: "A simple bow made of wood",
    minDamage: 3,
    maxDamage: 8,
    criticalChance: 0.12,
    accuracy: 0.7,
    rarity: "common",
    weaponClass: "ranged"
  },
  {
    name: "Training Staff",
    description: "A basic staff used for magic practice",
    minDamage: 2,
    maxDamage: 6,
    criticalChance: 0.08,
    accuracy: 0.8,
    rarity: "common",
    weaponClass: "magic"
  },

  // Uncommon weapons
  {
    name: "Iron Sword",
    description: "A well-crafted iron sword",
    minDamage: 5,
    maxDamage: 10,
    criticalChance: 0.12,
    accuracy: 1.0,
    rarity: "uncommon",
    weaponClass: "melee"
  },
  {
    name: "Steel Dagger",
    description: "A sharp steel dagger",
    minDamage: 4,
    maxDamage: 9,
    criticalChance: 0.18,
    accuracy: 1.0,
    rarity: "uncommon",
    weaponClass: "melee"
  },
  {
    name: "Iron Mace",
    description: "A heavy iron mace",
    minDamage: 6,
    maxDamage: 12,
    criticalChance: 0.08,
    accuracy: 1.0,
    rarity: "uncommon",
    weaponClass: "melee"
  },
  {
    name: "Hunting Bow",
    description: "A sturdy bow used for hunting",
    minDamage: 5,
    maxDamage: 11,
    criticalChance: 0.15,
    accuracy: 0.75,
    rarity: "uncommon",
    weaponClass: "ranged"
  },
  {
    name: "Apprentice Wand",
    description: "A wand used by magic apprentices",
    minDamage: 4,
    maxDamage: 9,
    criticalChance: 0.1,
    accuracy: 0.85,
    rarity: "uncommon",
    weaponClass: "magic"
  },

  // Rare weapons
  {
    name: "Silver Sword",
    description: "A gleaming silver sword",
    minDamage: 7,
    maxDamage: 14,
    criticalChance: 0.15,
    accuracy: 1.0,
    rarity: "rare",
    weaponClass: "melee"
  },
  {
    name: "Crystal Dagger",
    description: "A dagger made of magical crystal",
    minDamage: 6,
    maxDamage: 13,
    criticalChance: 0.2,
    accuracy: 1.0,
    rarity: "rare",
    weaponClass: "melee"
  },
  {
    name: "Dragonbone Hammer",
    description: "A hammer crafted from dragon bones",
    minDamage: 8,
    maxDamage: 16,
    criticalChance: 0.1,
    accuracy: 1.0,
    rarity: "rare",
    weaponClass: "melee"
  },
  {
    name: "Elven Longbow",
    description: "An elegant bow crafted by elven hands",
    minDamage: 8,
    maxDamage: 15,
    criticalChance: 0.18,
    accuracy: 0.8,
    rarity: "rare",
    weaponClass: "ranged"
  },
  {
    name: "Arcane Staff",
    description: "A staff imbued with arcane energy",
    minDamage: 7,
    maxDamage: 14,
    criticalChance: 0.15,
    accuracy: 0.9,
    rarity: "rare",
    weaponClass: "magic"
  },

  // Epic weapons
  {
    name: "Frost Blade",
    description: "A sword imbued with ice magic",
    minDamage: 10,
    maxDamage: 18,
    criticalChance: 0.18,
    accuracy: 1.0,
    rarity: "epic",
    weaponClass: "melee"
  },
  {
    name: "Shadow Dagger",
    description: "A dagger that seems to absorb light",
    minDamage: 9,
    maxDamage: 17,
    criticalChance: 0.25,
    accuracy: 1.0,
    rarity: "epic",
    weaponClass: "melee"
  },
  {
    name: "Thunder Hammer",
    description: "A hammer that crackles with electricity",
    minDamage: 12,
    maxDamage: 20,
    criticalChance: 0.15,
    accuracy: 1.0,
    rarity: "epic",
    weaponClass: "melee"
  },
  {
    name: "Storm Bow",
    description: "A bow that channels the power of storms",
    minDamage: 11,
    maxDamage: 19,
    criticalChance: 0.2,
    accuracy: 0.85,
    rarity: "epic",
    weaponClass: "ranged"
  },
  {
    name: "Celestial Staff",
    description: "A staff that draws power from the stars",
    minDamage: 10,
    maxDamage: 18,
    criticalChance: 0.22,
    accuracy: 0.95,
    rarity: "epic",
    weaponClass: "magic"
  },

  // Legendary weapons
  {
    name: "Excalibur",
    description: "The legendary sword of kings",
    minDamage: 15,
    maxDamage: 25,
    criticalChance: 0.2,
    accuracy: 1.0,
    rarity: "legendary",
    weaponClass: "melee"
  },
  {
    name: "Soul Reaper",
    description: "A dagger said to steal souls",
    minDamage: 14,
    maxDamage: 24,
    criticalChance: 0.3,
    accuracy: 1.0,
    rarity: "legendary",
    weaponClass: "melee"
  },
  {
    name: "Mjolnir",
    description: "The hammer of the gods",
    minDamage: 18,
    maxDamage: 28,
    criticalChance: 0.25,
    accuracy: 1.0,
    rarity: "legendary",
    weaponClass: "melee"
  },
  {
    name: "Apollo's Bow",
    description: "The legendary bow of the sun god",
    minDamage: 16,
    maxDamage: 26,
    criticalChance: 0.28,
    accuracy: 0.9,
    rarity: "legendary",
    weaponClass: "ranged"
  },
  {
    name: "Staff of the Archmage",
    description: "A staff that contains the power of ancient archmages",
    minDamage: 15,
    maxDamage: 25,
    criticalChance: 0.25,
    accuracy: 1.0,
    rarity: "legendary",
    weaponClass: "magic"
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