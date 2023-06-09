<script>
  import auth from "../authService";
  import { user, auth0Client } from "../store";
  import { goto } from "$app/navigation";

  async function login() {
    await auth.loginWithPopup($auth0Client);
    if ($user) {
      await goto("/dashboard");
    }
  }
</script>

<div
  class="flex flex-col items-center sm:items-start sm:flex-row sm:content-center sm:justify-center h-screen bg-kick-black"
>
  <div class="heroImg ml-4">
    <img src="/hero.png" alt="Hero Image" class="w-[300px] sm:mt-0" />
  </div>
  <!-- width="400px"
    height="350px" -->

  <div
    class="heroSection mt-10 sm:ml-6 sm:relative flex-col items-center justify-center"
  >
    <h1
      class="text-kick-gold text-center sm:text-left sm:text-4xl text-3xl font-semibold"
    >
      Your AI tool to analyze startups for simplifying investment decisions.
    </h1>
    <br />
    <div
      class="sm:mt-28 sm:absolute sm:top-[20%] sm:left-[20%] flex justify-center"
    >
      <button
        class="bg-kick-gold text-white w-80 h-14 rounded-2xl text-xl hero-btn"
        on:click={login}
      >
        Get Started
      </button>
    </div>
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
