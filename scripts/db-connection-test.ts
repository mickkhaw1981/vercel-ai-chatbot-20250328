import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Load environment variables
config({
  path: '.env.local',
});

const testConnection = async () => {
  if (!process.env.POSTGRES_URL) {
    console.error('❌ POSTGRES_URL is not defined in .env.local');
    process.exit(1);
  }

  console.log('⏳ Testing connection to Neon database...');
  
  try {
    const connection = postgres(process.env.POSTGRES_URL);
    const db = drizzle(connection);
    
    // Simple query to check connection
    const result = await connection`SELECT version()`;
    
    console.log('✅ Successfully connected to database');
    console.log('PostgreSQL version:', result[0].version);
    
    // Close the connection
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to connect to database');
    console.error(error);
    process.exit(1);
  }
};

testConnection(); 