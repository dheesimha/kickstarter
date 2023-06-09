<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  export let company;
  let win;
  onMount(() => {
    win = window;
  });
</script>

<div
  class="border-2 border-kick-gold rounded-2xl sm:mx-56 px-8 py-4 container1 cursor-pointer w-[70%]"
>
  <h2
    class="text-white text-center text-xl"
    on:click={() => {
      goto(`/reports/${company.companyName}`);
    }}
  >
    {company.companyName}
  </h2>
</div>

<style>
  .container1:hover {
    box-shadow: 0 0 45px #cbb26a;
    transition: 800ms;
  }

  .container1 {
    transition: 1s;
  }
</style>
