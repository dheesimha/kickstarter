import mongoose from 'mongoose';

export const GET = async () => {

    mongoose.set('strictQuery', false);

    try {
        if (mongoose.connection.readyState !== 1) {

            await mongoose.connect(import.meta.env.VITE_USER_DB_URI)
            return new Response("Connected to the DB")
        }
        else {
            return new Response("Already connected to the DB")
        }
    }
    catch (err) {
        return new Response(err)
    }
}
