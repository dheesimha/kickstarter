<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  let companyName = $page.params.company;
  let response;

  onMount(async () => {
    let res = await fetch(
      `/api/companies/${companyName}?companyName=${companyName}`,
      {
        method: "GET",
      }
    );

    response = await res.json();

    console.log(response);
  });
</script>

<h1 class="text-white text-center text-3xl font-bold">
  Report of {companyName}
</h1>

<div>
  <table class="mx-auto text-white text-lg border-2 border-kick-gold mt-8">
    <tr class="border-2 border-kick-gold">
      <td class="p-4">Company Name</td>
      {#if response !== undefined}
        <td class="border-kick-gold border-l-2 p-4">{response.companyName}</td>
      {/if}
    </tr>
    <tr class="border-2 border-kick-gold">
      <td class="p-4">Company Category</td>
      {#if response !== undefined}
        <td class="border-kick-gold border-l-2 p-4"
          >{response.companyCategory}</td
        >
      {/if}
    </tr>
    <tr class="border-2 border-kick-gold">
      <td class="p-4">Country</td>
      {#if response !== undefined}
        <td class="border-kick-gold border-l-2 p-4">{response.country}</td>
      {/if}
    </tr>
    <tr class="border-2 border-kick-gold">
      <td class="p-4">Total Funding in USD</td>
      {#if response !== undefined}
        <td class="border-kick-gold border-l-2 p-4"
          >{response.totalFundingAmount}</td
        >
      {/if}
    </tr>
    <tr class="border-2 border-kick-gold">
      <td class="p-4">Workforce</td>
      {#if response !== undefined}
        <td class="border-kick-gold border-l-2 p-4"
          >{response.workforce} members</td
        >
      {/if}
    </tr>
    <tr>
      <td class="p-4">Client Relationship score</td>
      {#if response !== undefined}
        <td class="border-kick-gold border-l-2 p-4">{response.crm} / 100</td>
      {/if}
    </tr>
  </table>
  <br />
  <br />

  {#if response !== undefined && response.success === 1}
    <p class="text-kick-gold ml-8 leading-7 mr-8 mb-32 text-center text-lg">
      <strong>{response.companyName}</strong> has a great potential for the
      investor to make <strong>postive returns</strong> .
      <br />
      The Investor has a high possibility of making profits by investing in this
      venture either through witnessing {response.companyName} going for an IPO ,
      or by getting acquired by a bigger player in {response.companyCategory} sector
      or the investor diluting his shares in the round {parseInt(
        response.fundingRounds
      ) + 1} of funding for a higher valuation.
    </p>
  {:else if response !== undefined && response.success === 0}
    <p class="text-kick-gold ml-8 leading-7 mr-8 mb-32 text-center text-lg">
      <strong>{response.companyName}</strong> can be a
      <strong>risky investment</strong>
      for the investor ,with a high probability of the venture failing in {response.companyCategory}
      domain.The AI recommends not to invest in the company,considering all the parameters
      and it's fundamentals.
      <br />
    </p>
  {/if}
</div>
