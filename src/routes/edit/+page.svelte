<script>
  import { onMount } from "svelte";
  import Tile from "../../lib/Tile.svelte";
  let companies = [];
  let win;
  onMount(async () => {
    win = window;
    if (!localStorage.getItem("email")) {
      await goto("/");
    }
    let email = localStorage.getItem("email");
    if (email) {
      let response = await fetch(`/api/companies?email=${email}`, {
        method: "GET",
      });

      companies = await response.json();
      companies = companies.reverse();
      console.log(companies);
    }
  });
</script>

{#if win != undefined}
  <div class="bg-kick-black min-h-screen h-fit">
    <h1 class="text-white text-center text-2xl sm:text-4xl font-bold">Edit</h1>
    <br />
    <br />

    {#if companies.length > 0}
      <div class="flex sm:block flex-col items-center justify-center">
        {#each companies as company}
          <Tile {company} />
          <br />
          <br />
        {/each}
      </div>
    {:else}
      <h2 class="text-white text-center text-xl">No companies analyzed.</h2>
    {/if}
  </div>
{/if}
