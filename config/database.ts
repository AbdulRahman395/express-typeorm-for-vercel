import 'reflect-metadata';
import AppDataSource from './data-source';

require('dotenv').config();

const initializeDatabase = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log('✅ Database has been connected successfully!');
        }
    } catch (err: any) {
        console.error('⚠️ DB Connection Error:', err.message);
        throw err;
    }
};

export default initializeDatabase;
