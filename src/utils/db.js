import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

export const connectToDB = async () => {
    try {
        await mongoose.connect(import.meta.env.VITE_USER_DB_URI)
        console.log("Connected to DB")
    }
    catch (err) {
        console.log('Failed to connect to the database', err)
        throw err;
    }


}
