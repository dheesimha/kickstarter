import { createAuth0Client } from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "./store";
import config from "../auth_config";

let userLocal;

user.subscribe((value) => {
    userLocal = value;
})

async function createClient() {
    let auth0Client = await createAuth0Client({
        domain: config.domain,
        clientId: config.clientId
    });

    return auth0Client;
}

async function loginWithPopup(client, options) {
    popupOpen.set(true);
    try {
        await client.loginWithPopup(options);

        await user.set(await client.getUser());
        await isAuthenticated.set(true);
        console.log(userLocal);
        await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify({
                email: userLocal.email,
                name: userLocal.name,
            }),
        });
        await localStorage.setItem("email", userLocal.email);
    }
    catch (e) {
        // eslint-disable-next-line
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

async function logout(client) {
    await localStorage.clear();
    return client.logout();
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;
