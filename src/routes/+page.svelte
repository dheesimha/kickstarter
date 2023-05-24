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
