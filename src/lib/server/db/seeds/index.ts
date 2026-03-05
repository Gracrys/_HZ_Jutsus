import Jutsu from '../models/Jutsu';
import { jutsusData } from './jutsus.seed';

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');
    
    // Check if data already exists
    const count = await Jutsu.count();
    if (count > 0) {
      console.log(`⚠️  Database already contains ${count} jutsus. Skipping seed.`);
      return;
    }

    // Seed jutsus
    await seedJutsus();
    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

async function seedJutsus() {
  try {
    console.log('🌱 Seeding jutsus...');
    for (const [key, jutsu] of Object.entries(jutsusData)) {
      await Jutsu.create(jutsu);
    }
    console.log(`✓ ${Object.keys(jutsusData).length} jutsus seeded`);
  } catch (error) {
    console.error('✗ Error seeding jutsus:', error);
    throw error;
  }
}

export { seedDatabase, seedJutsus };