import { seedDatabase } from './seeds';
import sequelize from './sequelize';


async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connected');
    
    await sequelize.sync();
    console.log('✓ Models synced');
    
    // Run seeds in development
    if (process.env.NODE_ENV !== 'production') {
      await seedDatabase();
    }
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

export { initializeDatabase };
   
 
    

export async function syncDatabase() {
    try {
        await initializeDatabase()
        // Perform database migrations
        await sequelize.sync();
        
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Failed to sync database:', error);
        throw error;
    }
}

export default syncDatabase;