import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

export async function getConnection() {
    try {
        await mongoose.connect(String(process.env.MONGO_URI),{ dbName: String(process.env.DB_NAME) });
        console.log('Connected To Mongo Successfully');
    } catch (error: any) {
        console.error(`Error trying to connect to Mongo`, error.message);
    }
}

