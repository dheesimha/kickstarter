<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  onMount(async () => {
    if (!localStorage.getItem("email")) {
      await goto("/");
    }
  });
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<div class="bg-kick-black min-h-screen">
  <h1 class="text-white text-center sm:text-4xl text-2xl font-bold">
    Dashboard
  </h1>
  <div class="grid-container mt-8 text-white text-center mb-4">
    <div
      class="grid-item"
      on:click={() => {
        goto("/analyze");
      }}
    >
      <h3 class="text-lg sm:mt-4 sm:text-xl text-kick-gold font-semibold">
        Analyze a new company
      </h3>
      <p class=" mt-6 text-white font-semibold hidden sm:block">
        Run the company metrics through the algorithm
      </p>
    </div>
    <div
      class="grid-item"
      on:click={() => {
        goto("/edit");
      }}
    >
      <h3 class="text-lg sm:mt-4 sm:text-xl text-kick-gold font-semibold">
        Edit previous company details
      </h3>
      <p class=" mt-6 text-white font-semibold hidden sm:block">
        Edit the metrics of a previously analyzed company
      </p>
    </div>
    <div
      class="grid-item-full"
      on:click={() => {
        goto("/reports");
      }}
    >
      <h3 class="text-lg sm:mt-4 sm:text-xl text-kick-gold font-semibold">
        View reports of analyzed companies
      </h3>
      <p class=" mt-6 text-white font-semibold hidden sm:block">
        Understand the parameters , decisions and the overall summary generated
        by the algorithm.
      </p>
    </div>
  </div>
</div>

<style>
  .grid-container {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto auto;
    border: 2px solid #cbb26a;
    border-radius: 8px;
    margin-left: 30px;
    margin-right: 30px;
  }

  .grid-item {
    border: 2px solid #cbb26a;
    transition: 400ms;
    border-radius: 8px;
    margin: 30px 80px;
    cursor: pointer;
    height: 120px;
  }

  .grid-item-full {
    grid-column: 1 / span 2;
    transition: 400ms;
    border: 2px solid #cbb26a;
    border-radius: 8px;
    margin: auto 80px 30px 80px;
    cursor: pointer;
    height: 120px;
  }

  .grid-item:hover,
  .grid-item-full:hover {
    box-shadow: 0 0 35px #cbb26a;
    transition: 400ms;
    /* border: 3px solid white; */
  }

  @media only screen and (max-width: 480px) {
    .grid-container {
      display: grid;
      grid-template-rows: auto auto;
      grid-template-columns: auto auto;
      border: 5px solid #cbb26a;
      border-radius: 8px;
      margin-left: 30px;
      margin-right: 30px;
    }

    .grid-item {
      border: 2px solid #cbb26a;
      transition: 400ms;
      border-radius: 8px;
      margin: 30px 20px;
      cursor: pointer;
      height: 120px;
      padding: 4px;
    }

    .grid-item-full {
      grid-column: 1 / span 2;
      transition: 400ms;
      border: 2px solid #cbb26a;
      border-radius: 8px;
      margin: auto 80px 30px 80px;
      cursor: pointer;
      height: 120px;
      padding: 4px;
    }
  }
</style>
