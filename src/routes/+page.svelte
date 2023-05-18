<!-- This is the home route of the website  -->
<script>
  import { onMount } from "svelte";
  import auth from "../authService";
  import { isAuthenticated, user } from "../store";

  let auth0Client;

  onMount(async () => {
    auth0Client = await auth.createClient();

    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
  });

  function login() {
    auth.loginWithPopup(auth0Client);
  }

  function logout() {
    auth.logout(auth0Client);
  }
</script>

<h1 class="text-red-400 text-3xl">Hello</h1>
<button id="login" on:click={login}>Login</button>
<button id="logout" on:click={logout}>Logout</button>

{#if $isAuthenticated}
  <h1>Hi {$user.name}</h1>
{/if}
