<script>
  import { onMount } from "svelte";
  import Tile from "../../lib/Tile.svelte";
  let companies = [];
  onMount(async () => {
    if (!localStorage.getItem("email")) {
      await goto("/");
    }
    let email = localStorage.getItem("email");
    if (email) {
      let response = await fetch(`/api/companies?email=${email}`, {
        method: "GET",
      });

      companies = await response.json();
      console.log(companies);
    }
  });
</script>

<h1 class="text-white text-center text-3xl font-bold">Edit</h1>
<br />
<br />

{#if companies.length > 0}
  {#each companies as company}
    <Tile {company} />
    <br />
    <br />
  {/each}
{:else}
  <h2 class="text-white text-center text-xl">No companies analyzed.</h2>
{/if}
