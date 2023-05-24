<script>
  import "../app.css";

  import { onMount } from "svelte";
  import auth from "../authService";
  import { isAuthenticated, user } from "../store";

  let showMenu = false;
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

  function toggleNavbar() {
    showMenu = !showMenu;
  }
</script>

<div>
  <div class="-mt-8 font-Nunito">
    <nav
      class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center"
    >
      <div class="flex items-center justify-between">
        <a
          class="text-xl font-bold text-gray-100 md:text-2xl hover:text-blue-400"
          href="/"
        >
          <img src="Kickstarter_logo.png" width="230" alt="Kickstarter logo" />
        </a>
        <!-- Mobile menu button -->
        <div on:click={toggleNavbar} class="flex md:hidden">
          <button
            type="button"
            class="text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <div
        class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0 {showMenu
          ? 'flex'
          : 'hidden'}"
      >
        <!-- <a class="text-gray-100 hover:text-kick-gold" href="/home">Home</a>
        <a class="text-gray-100 hover:text-kick-gold" href="/blog">Blogs</a>
        <a class="text-gray-100 hover:text-kick-gold" href="/contact"
          >Contact US</a
        >
        <a class="text-gray-100 hover:text-kick-gold" href="/about">About Us</a> -->
        {#if !$isAuthenticated}
          <button
            class="py-1.5 rounded-lg px-4 text-center border text-black hover:text-white block lg:inline lg:border-0 bg-kick-gold"
            on:click={login}
          >
            Login
          </button>
        {:else}
          <h2 class="text-white">Hi, {$user.given_name}</h2>
          <button
            class="py-1.5 rounded-lg px-4 text-center border text-black hover:text-white block lg:inline lg:border-0 bg-kick-gold"
            on:click={logout}
          >
            Logout
          </button>
        {/if}
      </div>
    </nav>
  </div>
</div>
<slot />
