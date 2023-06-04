import mongoose from 'mongoose';

export const GET = async () => {

    mongoose.set('strictQuery', false);

    try {
        if (mongoose.connection.readyState !== 1) {

            await mongoose.connect(import.meta.env.VITE_USER_DB_URI)
            if (mongoose.connection.readyState === 1)
                return new Response("Established a new connection with the DB")
        }
        else {
            return new Response("Already connected to the DB")
        }
    }
    catch (err) {
        return new Response(err)
    }
}
