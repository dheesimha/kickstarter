import { connectToDB } from "./utils/db"
let isDatabaseConnected = false;

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {

    if (!isDatabaseConnected) {
        await connectToDB()
        isDatabaseConnected = true;
    }

    const response = await resolve(event);
    return response;


}
