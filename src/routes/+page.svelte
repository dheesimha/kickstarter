<script>
  import { onMount } from "svelte";
  import auth from "../authService";
  import { user, auth0Client } from "../store";
  import { goto } from "$app/navigation";

  onMount(async () => {
    try {
      let res = await fetch("/api/db", {
        method: "GET",
      });

      let msg = await res.text();
      console.log(msg);
    } catch (error) {
      console.error(error);
    }
  });

  async function login() {
    await auth.loginWithPopup($auth0Client);
    if ($user) {
      await goto("/dashboard");
    }
  }
</script>

<div class="flex content-center justify-center h-screen bg-kick-black">
  <div class="heroImg ml-4">
    <img src="/hero.png" alt="Hero Image" width="400px" height="350px" />
  </div>

  <div class="heroSection mt-10 ml-6 relative">
    <h1 class="text-kick-gold text-4xl font-semibold">
      Your AI tool to analyze startups for simplifying investment decisions.
    </h1>
    <br />
    <button
      class="bg-kick-gold text-white mt-4 absolute top-[20%] left-[20%] w-80 h-14 rounded-2xl text-xl hero-btn"
      on:click={login}>Get Started</button
    >
  </div>
</div>

<style>
  .hero-btn {
    transition: 800ms;
  }

  .hero-btn:hover {
    background-color: #fff3d3;
    transition: 800ms;
    color: #1a1a1a;
  }
</style>
