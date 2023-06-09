<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import FundingParamsChart from "../../../lib/FundingParamsChart.svelte";
  import Doughnut from "../../../lib/Doughnut.svelte";
  let companyName = $page.params.company;
  let response,
    totalFundingChartData,
    totalFundingRoundsData,
    fundingDurationAvgData,
    investorData,
    ratingData,
    finModelData,
    fundamentalsModelData;

  onMount(async () => {
    let email = localStorage.getItem("email");
    let res = await fetch(
      `/api/companies/${companyName}?companyName=${companyName}&email=${email}`,
      {
        method: "GET",
      }
    );

    response = await res.json();
    console.log(response);

    totalFundingChartData = {
      labels: [
        `Successful startups in ${response.country}`,
        `${response.companyName}`,
      ],
      datasets: [
        {
          label: "Funding Amount in USD",
          data: [
            Math.floor(response.funding_total_average),
            Math.floor(response.totalFundingAmount),
          ],
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
          ],
          borderWidth: 2,
          borderColor: ["rgba(255, 134, 159, 1)", "rgba(98,  182, 239, 1)"],
        },
      ],
    };

    totalFundingRoundsData = {
      labels: [
        `Successful startups in ${response.country}`,
        `${response.companyName}`,
      ],
      datasets: [
        {
          label: "Total number of funding rounds",
          data: [
            Math.floor(response.funding_rounds_avg),
            Math.floor(response.fundingRounds),
          ],
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
          ],
          borderWidth: 2,
          borderColor: ["rgba(255, 134, 159, 1)", "rgba(98,  182, 239, 1)"],
        },
      ],
    };

    fundingDurationAvgData = {
      labels: [
        `Successful startups in ${response.country}`,
        `${response.companyName}`,
      ],
      datasets: [
        {
          label: "Avg number of days b/w two funding rounds",
          data: [
            Math.floor(response.country_funding_duration_avg),
            Math.floor(response.funding_duration_avg),
          ],
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
          ],
          borderWidth: 2,
          borderColor: ["rgba(255, 134, 159, 1)", "rgba(98,  182, 239, 1)"],
        },
      ],
    };
    investorData = {
      labels: [
        `Successful startups in ${response.country}`,
        `${response.companyName}`,
      ],
      datasets: [
        {
          label: "Avg number of Investors associated with the company",
          data: [3, `${response.workforce}`],
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
          ],
          borderWidth: 2,
          borderColor: ["rgba(255, 134, 159, 1)", "rgba(98,  182, 239, 1)"],
        },
      ],
    };
    ratingData = {
      labels: [
        `Successful startups in ${response.country}`,
        `${response.companyName}`,
      ],
      datasets: [
        {
          label: "Avg user rating of the company out of 100",
          data: [73, `${response.crm}`],
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
          ],
          borderWidth: 2,
          borderColor: ["rgba(255, 134, 159, 1)", "rgba(98,  182, 239, 1)"],
        },
      ],
    };

    finModelData = {
      labels: [
        "Categories of the company",
        "Total Funding in USD",
        "Country of origin",
        "Total rounds of funding",
        "Time period b/w first and last funding rounds",
        "First funding round date",
        "Last funding round date",
      ],
      datasets: [
        {
          data: [16.32, 22.34, 4.67, 1.93, 9.69, 24.51, 20.54],
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#61bdf2",
            "#4D5360",
            "#9b72f2",
            "#d4f55b",
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#4db9f7",
            "#616774",
            "#8f61f2",
            "#c2f213",
          ],
        },
      ],
    };

    fundamentalsModelData = {
      labels: [
        "Company among top 500 in the country/world",
        "Age of the company when it received it's first funding",
        "Age of the company when it reached it's first milestone",
        "Company rating by customers",
        "No. of milestones achieved",
        "Second round of funding",
        "No.of investors associated with the company",
        "Advertising and Marketing",
      ],
      datasets: [
        {
          data: [10.74, 13.73, 11.46, 22.79, 16.02, 4.9, 12.01, 8.36],
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#61bdf2",
            "#4D5360",
            "#9b72f2",
            "#d4f55b",
            "#8fbde3",
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#4db9f7",
            "#616774",
            "#8f61f2",
            "#c2f213",
            "#77b4e6",
          ],
        },
      ],
    };

    console.log(response);
  });
</script>

<svelte:head>
  <title>Report - {companyName}</title>
</svelte:head>

<div class="bg-kick-black min-h-screen h-fit">
  <h1 class="text-white text-center sm:text-4xl text-2xl font-bold">
    Report of {companyName}
  </h1>
  <br />
  <br />
  <h2 class="text-2xl text-kick-gold text-center font-bold">Overall Verdict</h2>
  <br />

  {#if response !== undefined}
    <div class="flex flex-col items-center justify-center">
      <br />
      {#if response.financialSuccess === 1 && response.perspectiveSuccess === 1}
        <span
          class="dot text-center pt-10 pl-2 pr-2 border-4 border-[#0cce6a] font-semibold text-xl text-[#0cce6a] successCircle"
          >Great Investment</span
        >
      {:else if response.financialSuccess === 1 && response.perspectiveSuccess === 0}
        <span
          class="dot text-center pt-10 pl-2 pr-2 border-4 border-[#0cce6a] font-semibold text-xl text-[#0cce6a] successCircle"
          >Good Investment</span
        >
      {:else if response.financialSuccess === 0 && response.perspectiveSuccess === 1}
        <span
          class="dot text-center pt-10 pl-2 pr-2 border-4 border-[#ffa400] font-semibold text-xl text-[#ffa400] potentialCircle"
          >Risky Investment</span
        >
      {:else if response.financialSuccess === 0 && response.perspectiveSuccess === 0}
        <span
          class="dot text-center pt-10 pl-2 pr-2 border-4 border-[#ff3333] font-semibold text-xl text-[#ff3333] failureCircle"
          >Bad Investment</span
        >
      {/if}
      <br />
      <br />

      <h2 class="text-xl sm:text-2xl text-kick-gold text-center font-bold">
        Key metrics to consider
      </h2>
      <br />
      <br />

      <div
        class="grid sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-10 justify-items-center content-center ml-8 mr-8"
      >
        <div>
          <h3 class="text-xl text-white text-center font-semibold">
            1. Comparison of total funding amount of {response.companyName} with
            successful startups in {response.country}
          </h3>
          <br />
          <div class="h-[450px] bg-white rounded-xl">
            <FundingParamsChart data={totalFundingChartData} />
          </div>
        </div>

        <div>
          <h3 class="text-xl text-white text-center font-semibold">
            2. Comparison of total number of funding rounds of {response.companyName}
            with successful startups in {response.country}
          </h3>
          <br />
          <div class="h-[450px] bg-white rounded-xl">
            <FundingParamsChart data={totalFundingRoundsData} />
          </div>
        </div>

        <div>
          <h3 class="text-xl text-white text-center font-semibold">
            3. Comparison of Avg number of days b/w first and last rounds of
            funding b/w {response.companyName}
            and successful startups in {response.country}
          </h3>
          <br />
          <div class="h-[450px] bg-white rounded-xl">
            <FundingParamsChart data={fundingDurationAvgData} />
          </div>
        </div>

        <div>
          <h3 class="text-xl text-white text-center font-semibold">
            4. Comparison of Avg number of Investors associated with {response.companyName}
            and successful startups in {response.country}
          </h3>
          <br />
          <div class="h-[450px] bg-white rounded-xl">
            <FundingParamsChart data={investorData} />
          </div>
        </div>

        <div>
          <h3 class="text-xl text-white text-center font-semibold">
            5. Comparison of Avg user rating of the company out of 100 b/w {response.companyName}
            and successful startups in {response.country}
          </h3>
          <br />
          <div class="h-[450px] bg-white rounded-xl">
            <FundingParamsChart data={ratingData} />
          </div>
        </div>
      </div>
      <br />
      <br />

      <h2
        class="text-xl sm:text-2xl text-kick-gold text-center font-bold ml-4 mr-4 sm:ml-0 sm:mr-0"
      >
        Impact and weightage of the metrics in the final result generated by the
        model
      </h2>
      <br />
      <br />
      <div
        class="grid sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-10 justify-items-center content-center ml-8 mr-8"
      >
        <div>
          <h3 class="text-xl text-white text-center font-semibold w-full">
            1. Factors considered in the Financials model
          </h3>
          <br />
          <div class="sm:h-[450px] h-[400px] bg-white rounded-xl">
            <Doughnut data={finModelData} />
          </div>
        </div>
        <div>
          <h3 class="text-xl text-white text-center font-semibold w-full">
            2. Factors considered in the Fundamentals model
          </h3>
          <br />
          <div class="sm:h-[450px] h-[400px] bg-white rounded-xl">
            <Doughnut data={fundamentalsModelData} />
          </div>
        </div>
      </div>
      <br />
      <br />
      <h2 class="text-xl sm:text-2xl text-kick-gold text-center font-bold">
        Final verdict
      </h2>
      <br />

      {#if response.financialSuccess === 1 && response.perspectiveSuccess === 1}
        <p
          class="text-white ml-8 leading-7 mr-8 mb-32 text-left sm:text-center text-lg"
        >
          <strong>{response.companyName}</strong> has a
          <span class="text-[#0cce6a]">
            <strong>
              great potential for the investor to make postive returns.
            </strong>
          </span>
          <br />
          The Investor has a
          <span class="text-[#0cce6a]">
            <strong> high possibility of making profits </strong>
          </span>
          by investing in this venture either through witnessing {response.companyName}
          going for an
          <span class="text-[#0cce6a]">
            <strong> IPO </strong>
          </span>
          , or by
          <span class="text-[#0cce6a]">
            <strong> getting acquired by a bigger player </strong>
          </span>
          in {response.companyCategory}
          sector or the investor
          <span class="text-[#0cce6a]">
            <strong>
              diluting their shares in the round {parseInt(
                response.fundingRounds
              ) + 1} of funding for a higher valuation
            </strong>
          </span>
          .
        </p>
      {:else if response.financialSuccess === 1 && response.perspectiveSuccess === 0}
        <p
          class="text-white ml-8 leading-7 mr-8 mb-32 text-left sm:text-center text-lg"
        >
          <strong>{response.companyName}</strong> has a
          <span class="text-[#0cce6a]">
            <strong>
              good potential for the investor to make postive returns.
            </strong>
          </span>

          <br />
          The Investor has a
          <span class="text-[#0cce6a]">
            <strong> good possibility of making profits </strong>
          </span>
          by investing in this venture either through witnessing {response.companyName}
          going for an
          <span class="text-[#0cce6a]">
            <strong> IPO </strong>
          </span>
          , or by
          <span class="text-[#0cce6a]">
            <strong> getting acquired by a bigger player </strong>
          </span>
          in {response.companyCategory}
          sector or the investor
          <span class="text-[#0cce6a]">
            <strong>
              diluting their shares in the round {parseInt(
                response.fundingRounds
              ) + 1} of funding for a higher valuation
            </strong>
          </span>
          . However a
          <span class="text-[#ffa400]">
            <strong> strong focus </strong>
          </span>
          has to be made on the fundamentals of the company such as
          <span class="text-[#ffa400]">
            <strong>
              profitablility,launching or improving existing lines of
              products,marketing and advertising ,customer service and
              satisfaction
            </strong>
          </span>
          .
        </p>
      {:else if response.financialSuccess === 0 && response.perspectiveSuccess === 1}
        <p
          class="text-white ml-8 leading-7 mr-8 mb-32 text-left sm:text-center text-lg"
        >
          <strong>{response.companyName}</strong> has a
          <span class="text-[#ffa400]">
            <strong>potential to be a good investment</strong>
          </span>
          for the investor.But thorough focus has to be made on the
          <span class="text-[#ffa400]">
            <strong> financial aspects</strong>
          </span>
          of the company by concentrating on
          <span class="text-[#ffa400]">
            <strong> raising good amount of capital </strong>
          </span>
          from reputable investors with an appropriate valuation and
          <span class="text-[#ffa400]">
            <strong> low burn rate. </strong>
          </span>
          <br />
        </p>
      {:else if response.financialSuccess === 0 && response.perspectiveSuccess === 0}
        <p
          class="text-white ml-8 leading-7 mr-8 mb-32 text-left sm:text-center text-lg"
        >
          <strong>{response.companyName}</strong> can be a
          <span class="text-[#ff3333]">
            <strong>risky investment</strong>
          </span>
          for the investor ,with a high probability of the venture
          <span class="text-[#ff3333]">
            <strong> failing </strong>
          </span>
          in {response.companyCategory}
          domain.
          <span class="text-[#ff3333]">
            <strong> The AI recommends not to invest in the company </strong>
          </span>,considering it's financials and fundamentals.
          <br />
        </p>
      {/if}
    </div>
  {/if}
</div>

<style>
  .dot {
    height: 150px;
    width: 150px;
    /* background-color: #; */
    border-radius: 50%;
    display: inline-block;
    margin: auto;
  }

  .successCircle {
    box-shadow: 0 0 40px #0cce6a;
  }

  .failureCircle {
    box-shadow: 0 0 40px #ff3333;
  }

  .potentialCircle {
    box-shadow: 0 0 40px #ffa400;
  }
</style>
