<script>
  import { onMount } from "svelte";

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
</script>

<div class="flex mx-6 content-center justify-center">
  <div class="heroImg ml-4">
    <img src="/hero.png" alt="Hero Image" width="400px" height="350px" />
  </div>

  <div class="heroSection mt-10 ml-6 relative">
    <h1 class="text-kick-gold text-4xl font-semibold">
      Your AI tool to analyze startups for simplifying investment decisions.
    </h1>
    <br />
    <button
      class="bg-kick-gold text-white mt-4 absolute top-[50%] left-[20%] w-80 h-14 rounded-2xl text-xl hero-btn"
      >Get Started</button
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
