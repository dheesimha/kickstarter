<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  export let company;
  let win;
  onMount(() => {
    win = window;
  });

  async function deleteCompany(obj) {
    // win.location.reload();
    if (confirm("Are you sure you want to delete " + obj.companyName)) {
      let res = await fetch(`/api/companies/${obj.companyName}`, {
        method: "DELETE",
        body: JSON.stringify(obj),
      });

      if (res.status == 200) {
        goto("/edit");
      }
    }
  }
</script>

<div class="border-2 border-kick-gold rounded-2xl mx-56 px-8 py-4 container1">
  <h2 class="text-white text-center text-xl">{company.companyName}</h2>
  <div class="icons sm:inline sm:float-right sm:-mt-7 flex flex-row mt-2">
    <svg
      on:click={() => {
        goto(`/edit/${company.companyName}`);
      }}
      fill="#cbb26a"
      xmlns="http://www.w3.org/2000/svg"
      class="inline cursor-pointer edit w-6"
      viewBox="0 0 512 512"
      ><path
        d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
      /></svg
    >

    <svg
      on:click={deleteCompany(company)}
      fill="#cbb26a"
      class="inline ml-8 cursor-pointer trash w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      ><path
        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
      /></svg
    >
  </div>
</div>

<style>
  .container1:hover {
    box-shadow: 0 0 45px #cbb26a;
    transition: 800ms;
  }

  .container1 {
    transition: 1s;
  }

  .edit,
  .trash {
    transition: 800ms;
  }
  .edit:hover,
  .trash:hover {
    fill: #fff3d3;
    transition: 800ms;
  }
</style>
