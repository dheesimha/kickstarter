<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  let companyName = $page.params.company;
  let steps,
    nextBtn,
    prevBtn,
    form,
    fundingRounds = 0,
    dateElement,
    inputElement,
    doc,
    response,
    companyNameElement,
    countryElement,
    totalFundingAmountElement,
    companyCategoryElement,
    firstFundingAgeElement,
    crmElement,
    milestoneCountElement,
    firstMilestoneAgeElement,
    workforceElement,
    topCompanyRadioGroup,
    advertRadioGroup,
    secondRoundRadioGroup;

  onMount(async () => {
    if (!localStorage.getItem("email")) {
      await goto("/");
    }
    let result = await fetch(
      `/api/companies/${companyName}?companyName=${companyName}`,
      {
        method: "GET",
      }
    );

    response = await result.json();
    fundingRounds = await response.fundingRounds;

    doc = document;
    dateElement = document.getElementById("datepicker");
    steps = Array.from(document.querySelectorAll("form .step"));
    nextBtn = document.querySelectorAll("form .next-btn");
    prevBtn = document.querySelectorAll("form .previous-btn");
    form = document.querySelector("form");
    advertRadioGroup = document.getElementsByName("advert");
    topCompanyRadioGroup = document.getElementsByName("topCompany");
    secondRoundRadioGroup = document.getElementsByName("secondRound");

    nextBtn.forEach((button) => {
      button.addEventListener("click", () => {
        changeStep("next");
      });
    });
    prevBtn.forEach((button) => {
      button.addEventListener("click", () => {
        changeStep("prev");
      });

      if (response) {
        companyNameElement = document.getElementById("companyName");
        companyCategoryElement = document.getElementById("companyCategory");
        totalFundingAmountElement = document.getElementById("fundsRaised");
        countryElement = document.getElementById("country");
        firstFundingAgeElement = document.getElementById("firstFundingAge");
        crmElement = document.getElementById("crm");
        firstMilestoneAgeElement = document.getElementById("firstMilestoneAge");
        milestoneCountElement = document.getElementById("milestoneCount");
        workforceElement = document.getElementById("workforce");

        companyNameElement.value = response.companyName;
        companyCategoryElement.value = response.companyCategory;
        totalFundingAmountElement.value = response.totalFundingAmount;
        countryElement.value = response.country;
        firstFundingAgeElement.value = response.firstFundingAge;
        crmElement.value = response.crm;
        firstMilestoneAgeElement.value = response.firstMilestoneAge;
        milestoneCountElement.value = response.milestoneCount;
        workforceElement.value = response.workforce;

        response.secondRound === "true"
          ? (secondRoundRadioGroup[0].checked = true)
          : (secondRoundRadioGroup[1].checked = true);
        response.topCompany === "true"
          ? (topCompanyRadioGroup[0].checked = true)
          : (topCompanyRadioGroup[1].checked = true);
        response.advert === "true"
          ? (advertRadioGroup[0].checked = true)
          : (advertRadioGroup[1].checked = true);

        let fundingRoundsInt = parseInt(fundingRounds);
        let difference = fundingRoundsInt - (dateElement.children.length - 1);

        if (difference > 0 && fundingRoundsInt > 0) {
          for (let i = 0; i < difference; i++) {
            inputElement = doc.createElement("input");
            console.log(inputElement);
            inputElement.type = "date";
            inputElement.id =
              "fundingRound" + dateElement.children.length + "Date";
            inputElement.name =
              "fundingRound" + dateElement.children.length + "Date";
            inputElement.style.display = "block";
            inputElement.value = response.fundingDates[i];
            inputElement.classList.add(
              "mt-2",
              "bg-kick-gold",
              "text-kick-black"
            );
            dateElement.appendChild(inputElement);
          }
        }
      }
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const inputs = [];
      form.querySelectorAll("select").forEach((select) => {
        const { name, value } = select;
        inputs.push({ name, value });
      });
      form.querySelectorAll("input").forEach((input) => {
        if (input.type !== "radio") {
          const { name, value } = input;
          inputs.push({ name, value });
        }
      });

      //Advert radio group
      for (let i = 0; i < advertRadioGroup.length; i++) {
        if (advertRadioGroup[i].checked) {
          let groupName = advertRadioGroup[i].name;
          let value = advertRadioGroup[i].value;
          inputs.push({ name: groupName, value: value });
        }
      }

      //topCompany radio group
      for (let i = 0; i < topCompanyRadioGroup.length; i++) {
        if (topCompanyRadioGroup[i].checked) {
          let groupName = topCompanyRadioGroup[i].name;
          let value = topCompanyRadioGroup[i].value;
          inputs.push({ name: groupName, value: value });
        }
      }

      //Second round of funding radio group
      for (let i = 0; i < secondRoundRadioGroup.length; i++) {
        if (secondRoundRadioGroup[i].checked) {
          let groupName = secondRoundRadioGroup[i].name;
          let value = secondRoundRadioGroup[i].value;
          inputs.push({ name: groupName, value: value });
        }
      }

      console.log(inputs);

      // Push elements of input array into an object
      let result = inputs.reduce((object, item) => {
        object[item.name] = item.value;
        return object;
      }, {});

      result.resourceId = response.id;
      result.userId = response.user;

      console.log(result);

      await fetch(`/api/companies/${companyName}`, {
        method: "PUT",
        body: JSON.stringify(result),
      });

      // await changeStep("prev");
      alert("Successfully edited the details of "+companyName)
    });
  });

  function changeStep(btn) {
    let index = 0;
    const active = document.querySelector(".active");
    index = steps.indexOf(active);
    steps[index].classList.remove("active");
    if (btn === "next") {
      index++;
    } else if (btn === "prev") {
      index--;
    }
    steps[index].classList.add("active");
  }

  function createDateDivs() {
    console.log(dateElement.children);
    let fundingRoundsInt = parseInt(fundingRounds);
    let difference = fundingRoundsInt - (dateElement.children.length - 1);

    if (difference > 0 && fundingRoundsInt > 0) {
      for (let i = 0; i < difference; i++) {
        inputElement = doc.createElement("input");
        console.log(inputElement);
        inputElement.type = "date";
        inputElement.id = "fundingRound" + dateElement.children.length + "Date";
        inputElement.name =
          "fundingRound" + dateElement.children.length + "Date";
        inputElement.style.display = "block";
        inputElement.classList.add("mt-2", "bg-kick-gold", "text-kick-black");
        dateElement.appendChild(inputElement);
      }
    } else if (difference < 0 && fundingRoundsInt >= 0) {
      difference = Math.abs(difference);
      while (difference--) {
        dateElement.removeChild(dateElement.lastChild);
      }
    } else if (fundingRoundsInt < 0) {
      while (dateElement.children.length !== 1) {
        dateElement.removeChild(dateElement.lastChild);
      }
    }
  }
</script>

<h1 class="text-white text-center text-2xl">Analyze</h1>

<section>
  <div class="container text-white -mt-24">
    <form>
      <div class="step step-1 active bg-kick-gold">
        <div class="form-group bg-kick-gold">
          <label for="companyName" class="bg-kick-gold">Company name</label>
          <input type="text" id="companyName" name="companyName" />
        </div>

        <!-- Countries option list -->
        <div class="form-group bg-kick-gold">
          <label for="country" class="bg-kick-gold"
            >Country Incorporated in
          </label>
          <select class="form-select py-2 w-full" id="country" name="country">
            <option value="null" />
            <option value="Afghanistan">Afghanistan</option>
            <option value="Aland Islands">Aland Islands</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bonaire, Sint Eustatius and Saba"
              >Bonaire, Sint Eustatius and Saba</option
            >
            <option value="Bosnia and Herzegovina"
              >Bosnia and Herzegovina</option
            >
            <option value="Botswana">Botswana</option>
            <option value="Bouvet Island">Bouvet Island</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Territory"
              >British Indian Ocean Territory</option
            >
            <option value="Brunei Darussalam">Brunei Darussalam</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic"
              >Central African Republic</option
            >
            <option value="Chad">Chad</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos (Keeling) Islands"
              >Cocos (Keeling) Islands</option
            >
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Congo, Democratic Republic of the Congo"
              >Congo, Democratic Republic of the Congo</option
            >
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cote D'Ivoire">Cote D'Ivoire</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Curacao">Curacao</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands (Malvinas)"
              >Falkland Islands (Malvinas)</option
            >
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Territories"
              >French Southern Territories</option
            >
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guernsey">Guernsey</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Heard Island and Mcdonald Islands"
              >Heard Island and Mcdonald Islands</option
            >
            <option value="Holy See (Vatican City State)"
              >Holy See (Vatican City State)</option
            >
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran, Islamic Republic of"
              >Iran, Islamic Republic of</option
            >
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Isle of Man">Isle of Man</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jersey">Jersey</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Korea, Democratic People's Republic of">
              Korea, Democratic People's Republic of</option
            >
            <option value="Korea, Republic of">Korea, Republic of</option>
            <option value="Kosovo">Kosovo</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Lao People's Democratic Republic"
              >Lao People's Democratic Republic</option
            >
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libyan Arab Jamahiriya"
              >Libyan Arab Jamahiriya</option
            >
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macao">Macao</option>
            <option value="Macedonia, the Former Yugoslav Republic of"
              >Macedonia, the Former Yugoslav Republic of</option
            >
            <option value="Madagascar">Madagascar</option>
            <option value="Malawi">Malawi</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Micronesia, Federated States of"
              >Micronesia, Federated States of</option
            >
            <option value="Moldova, Republic of">Moldova, Republic of</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="Netherlands Antilles">Netherlands Antilles</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Northern Mariana Islands"
              >Northern Mariana Islands</option
            >
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Palestinian Territory, Occupied"
              >Palestinian Territory, Occupied</option
            >
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Philippines">Philippines</option>
            <option value="Pitcairn">Pitcairn</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russian Federation">Russian Federation</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Saint Barthelemy">Saint Barthelemy</option>
            <option value="Saint Helena">Saint Helena</option>
            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
            <option value="Saint Lucia">Saint Lucia</option>
            <option value="Saint Martin">Saint Martin</option>
            <option value="Saint Pierre and Miquelon"
              >Saint Pierre and Miquelon</option
            >
            <option value="Saint Vincent and the Grenadines"
              >Saint Vincent and the Grenadines</option
            >
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Serbia">Serbia</option>
            <option value="Serbia and Montenegro">Serbia and Montenegro</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Sint Maarten">Sint Maarten</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Georgia and the South Sandwich Islands"
              >South Georgia and the South Sandwich Islands</option
            >
            <option value="South Sudan">South Sudan</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Svalbard and Jan Mayen"
              >Svalbard and Jan Mayen</option
            >
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
            <option value="Taiwan, Province of China"
              >Taiwan, Province of China</option
            >
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania, United Republic of"
              >Tanzania, United Republic of</option
            >
            <option value="Thailand">Thailand</option>
            <option value="Timor-Leste">Timor-Leste</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks and Caicos Islands"
              >Turks and Caicos Islands</option
            >
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="United States Minor Outlying Islands"
              >United States Minor Outlying Islands</option
            >
            <option value="Uruguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Viet Nam">Viet Nam</option>
            <option value="Virgin Islands, British"
              >Virgin Islands, British</option
            >
            <option value="Virgin Islands, U.s.">Virgin Islands, U.s.</option>
            <option value="Wallis and Futuna">Wallis and Futuna</option>
            <option value="Western Sahara">Western Sahara</option>
            <option value="Yemen">Yemen</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </select>
        </div>

        <!-- Company Category option list  -->
        <div class="form-group bg-kick-gold">
          <label for="companyCategory" class="bg-kick-gold"
            >Company Category
          </label>
          <select
            class="form-select py-2 w-full"
            id="companyCategory"
            name="companyCategory"
          >
            <option value="null" />
            <option value="3D Printing">3D Printing</option>
            <option value="Adaptive Equipment">Adaptive Equipment</option>
            <option value="Advertising Exchanges">Advertising Exchanges</option>
            <option value="Advertising Networks">Advertising Networks</option>
            <option value="Advertising Platforms">Advertising Platforms</option>
            <option value="Aerospace">Aerospace</option>
            <option value="Air Pollution Control">Air Pollution Control</option>
            <option value="Algorithms">Algorithms</option>
            <option value="Alternative Medicine">Alternative Medicine</option>
            <option value="Alumni">Alumni</option>
            <option value="Analytics">Analytics</option>
            <option value="Angels">Angels</option>
            <option value="Animal Feed">Animal Feed</option>
            <option value="Anything Capital Intensive"
              >Anything Capital Intensive</option
            >
            <option value="App Discovery">App Discovery</option>
            <option value="App Marketing">App Marketing</option>
            <option value="App Stores">App Stores</option>
            <option value="Application Platforms">Application Platforms</option>
            <option value="Apps">Apps</option>
            <option value="Aquaculture">Aquaculture</option>
            <option value="Architecture">Architecture</option>
            <option value="Archiving">Archiving</option>
            <option value="Art">Art</option>
            <option value="Artificial Intelligence"
              >Artificial Intelligence</option
            >
            <option value="Artists Globally">Artists Globally</option>
            <option value="Assisitive Technology">Assisitive Technology</option>
            <option value="Assisted Living">Assisted Living</option>
            <option value="Auctions">Auctions</option>
            <option value="Audio">Audio</option>
            <option value="Audiobooks">Audiobooks</option>
            <option value="Augmented Reality">Augmented Reality</option>
            <option value="Auto">Auto</option>
            <option value="Automated Kiosk">Automated Kiosk</option>
            <option value="Automotive">Automotive</option>
            <option value="B2B">B2B</option>
            <option value="B2B Express Delivery">B2B Express Delivery</option>
            <option value="Babies">Babies</option>
            <option value="Baby Accessories">Baby Accessories</option>
            <option value="Baby Boomers">Baby Boomers</option>
            <option value="Baby Safety">Baby Safety</option>
            <option value="Banking">Banking</option>
            <option value="Batteries">Batteries</option>
            <option value="Beauty">Beauty</option>
            <option value="Bicycles">Bicycles</option>
            <option value="Big Data">Big Data</option>
            <option value="Big Data Analytics">Big Data Analytics</option>
            <option value="Billing">Billing</option>
            <option value="Biofuels">Biofuels</option>
            <option value="Bioinformatics">Bioinformatics</option>
            <option value="Biomass Power Generation"
              >Biomass Power Generation</option
            >
            <option value="Biometrics">Biometrics</option>
            <option value="Bio-Pharm">Bio-Pharm</option>
            <option value="Biotechnology">Biotechnology</option>
            <option value="Biotechnology and Semiconductor"
              >Biotechnology and Semiconductor</option
            >
            <option value="Bitcoin">Bitcoin</option>
            <option value="Blogging Platforms">Blogging Platforms</option>
            <option value="Boating Industry">Boating Industry</option>
            <option value="BPO Services">BPO Services</option>
            <option value="Brand Marketing">Brand Marketing</option>
            <option value="Brewing">Brewing</option>
            <option value="Bridging Online and Offline"
              >Bridging Online and Offline</option
            >
            <option value="Broadcasting">Broadcasting</option>
            <option value="Brokers">Brokers</option>
            <option value="Browser Extensions">Browser Extensions</option>
            <option value="Building Owners">Building Owners</option>
            <option value="Building Products">Building Products</option>
            <option value="Business Analytics">Business Analytics</option>
            <option value="Business Development">Business Development</option>
            <option value="Business Information Systems"
              >Business Information Systems</option
            >
            <option value="Business Intelligence">Business Intelligence</option>
            <option value="Business Productivity">Business Productivity</option>
            <option value="Business Services">Business Services</option>
            <option value="Business Travelers">Business Travelers</option>
            <option value="Cable">Cable</option>
            <option value="CAD">CAD</option>
            <option value="Call Center Automation"
              >Call Center Automation</option
            >
            <option value="Cannabis">Cannabis</option>
            <option value="Carbon">Carbon</option>
            <option value="Career Management">Career Management</option>
            <option value="Career Planning">Career Planning</option>
            <option value="Cars">Cars</option>
            <option value="Casual Games">Casual Games</option>
            <option value="Cause Marketing">Cause Marketing</option>
            <option value="Celebrity">Celebrity</option>
            <option value="Certification Test">Certification Test</option>
            <option value="Charities">Charities</option>
            <option value="Charity">Charity</option>
            <option value="Charter Schools">Charter Schools</option>
            <option value="Chat">Chat</option>
            <option value="Chemicals">Chemicals</option>
            <option value="Child Care">Child Care</option>
            <option value="China Internet">China Internet</option>
            <option value="Civil Engineers">Civil Engineers</option>
            <option value="Classifieds">Classifieds</option>
            <option value="Clean Energy">Clean Energy</option>
            <option value="Clean Technology">Clean Technology</option>
            <option value="Clean Technology IT">Clean Technology IT</option>
            <option value="Clinical Trials">Clinical Trials</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Cloud Data Services">Cloud Data Services</option>
            <option value="Cloud Infrastructure">Cloud Infrastructure</option>
            <option value="Cloud Management">Cloud Management</option>
            <option value="Cloud Security">Cloud Security</option>
            <option value="Cloud-Based Music">Cloud-Based Music</option>
            <option value="Coffee">Coffee</option>
            <option value="Collaboration">Collaboration</option>
            <option value="Collaborative Consumption"
              >Collaborative Consumption</option
            >
            <option value="Collectibles">Collectibles</option>
            <option value="College Campuses">College Campuses</option>
            <option value="College Recruiting">College Recruiting</option>
            <option value="Colleges">Colleges</option>
            <option value="Comics">Comics</option>
            <option value="Commercial Real Estate"
              >Commercial Real Estate</option
            >
            <option value="Commercial Solar">Commercial Solar</option>
            <option value="Commodities">Commodities</option>
            <option value="Communications Hardware"
              >Communications Hardware</option
            >
            <option value="Communications Infrastructure"
              >Communications Infrastructure</option
            >
            <option value="Communities">Communities</option>
            <option value="Comparison Shopping">Comparison Shopping</option>
            <option value="Computer Vision">Computer Vision</option>
            <option value="Computers">Computers</option>
            <option value="Concentrated Solar Power"
              >Concentrated Solar Power</option
            >
            <option value="Concerts">Concerts</option>
            <option value="Console Gaming">Console Gaming</option>
            <option value="Construction">Construction</option>
            <option value="Consulting">Consulting</option>
            <option value="Consumer Behavior">Consumer Behavior</option>
            <option value="Consumer Electronics">Consumer Electronics</option>
            <option value="Consumer Goods">Consumer Goods</option>
            <option value="Consumer Internet">Consumer Internet</option>
            <option value="Consumer Lending">Consumer Lending</option>
            <option value="Consumers">Consumers</option>
            <option value="Contact Centers">Contact Centers</option>
            <option value="Contact Management">Contact Management</option>
            <option value="Content">Content</option>
            <option value="Content Creators">Content Creators</option>
            <option value="Content Delivery">Content Delivery</option>
            <option value="Content Discovery">Content Discovery</option>
            <option value="Content Syndication">Content Syndication</option>
            <option value="Contests">Contests</option>
            <option value="Cooking">Cooking</option>
            <option value="Corporate IT">Corporate IT</option>
            <option value="Corporate Training">Corporate Training</option>
            <option value="Corporate Wellness">Corporate Wellness</option>
            <option value="Cosmetic Surgery">Cosmetic Surgery</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Coupons">Coupons</option>
            <option value="Coworking">Coworking</option>
            <option value="Craft Beer">Craft Beer</option>
            <option value="Creative">Creative</option>
            <option value="Creative Industries">Creative Industries</option>
            <option value="Credit">Credit</option>
            <option value="Credit Cards">Credit Cards</option>
            <option value="CRM">CRM</option>
            <option value="Crowdfunding">Crowdfunding</option>
            <option value="Crowdsourcing">Crowdsourcing</option>
            <option value="Cryptocurrency">Cryptocurrency</option>
            <option value="Curated Web">Curated Web</option>
            <option value="Custom Retail">Custom Retail</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Customer Support Tools"
              >Customer Support Tools</option
            >
            <option value="Cyber">Cyber</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Data Center Automation"
              >Data Center Automation</option
            >
            <option value="Data Center Infrastructure"
              >Data Center Infrastructure</option
            >
            <option value="Data Centers">Data Centers</option>
            <option value="Data Integration">Data Integration</option>
            <option value="Data Mining">Data Mining</option>
            <option value="Data Privacy">Data Privacy</option>
            <option value="Data Security">Data Security</option>
            <option value="Data Visualization">Data Visualization</option>
            <option value="Databases">Databases</option>
            <option value="Debt Collecting">Debt Collecting</option>
            <option value="Deep Information Technology"
              >Deep Information Technology</option
            >
            <option value="Defense">Defense</option>
            <option value="Delivery">Delivery</option>
            <option value="Demographies">Demographies</option>
            <option value="Dental">Dental</option>
            <option value="Design">Design</option>
            <option value="Designers">Designers</option>
            <option value="Developer APIs">Developer APIs</option>
            <option value="Developer Tools">Developer Tools</option>
            <option value="Development Platforms">Development Platforms</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Diagnostics">Diagnostics</option>
            <option value="Dietary Supplements">Dietary Supplements</option>
            <option value="Digital Entertainment">Digital Entertainment</option>
            <option value="Digital Media">Digital Media</option>
            <option value="Digital Rights Management"
              >Digital Rights Management</option
            >
            <option value="Digital Signage">Digital Signage</option>
            <option value="Direct Advertising">Direct Advertising</option>
            <option value="Direct Marketing">Direct Marketing</option>
            <option value="Direct Sales">Direct Sales</option>
            <option value="Discounts">Discounts</option>
            <option value="Displays">Displays</option>
            <option value="Disruptive Models">Disruptive Models</option>
            <option value="Distribution">Distribution</option>
            <option value="Distributors">Distributors</option>
            <option value="Diving">Diving</option>
            <option value="DIY">DIY</option>
            <option value="Doctors">Doctors</option>
            <option value="Document Management">Document Management</option>
            <option value="DOD/Military">DOD/Military</option>
            <option value="Domains">Domains</option>
            <option value="Drones">Drones</option>
            <option value="Early Stage IT">Early Stage IT</option>
            <option value="Early-Stage Technology"
              >Early-Stage Technology</option
            >
            <option value="East Africa">East Africa</option>
            <option value="EBooks">EBooks</option>
            <option value="E-Books">E-Books</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="E-Commerce Platforms">E-Commerce Platforms</option>
            <option value="EDA Tools">EDA Tools</option>
            <option value="Ediscovery">Ediscovery</option>
            <option value="EdTech">EdTech</option>
            <option value="Education">Education</option>
            <option value="Educational Games">Educational Games</option>
            <option value="Edutainment">Edutainment</option>
            <option value="Elder Care">Elder Care</option>
            <option value="Elderly">Elderly</option>
            <option value="Electric Vehicles">Electric Vehicles</option>
            <option value="Electrical Distribution"
              >Electrical Distribution</option
            >
            <option value="Electronic Health Records"
              >Electronic Health Records</option
            >
            <option value="Electronics">Electronics</option>
            <option value="Email">Email</option>
            <option value="Email Marketing">Email Marketing</option>
            <option value="Email Newsletters">Email Newsletters</option>
            <option value="Embedded Hardware and Software"
              >Embedded Hardware and Software</option
            >
            <option value="Emerging Markets">Emerging Markets</option>
            <option value="Employer Benefits Programs"
              >Employer Benefits Programs</option
            >
            <option value="Employment">Employment</option>
            <option value="Energy">Energy</option>
            <option value="Energy Efficiency">Energy Efficiency</option>
            <option value="Energy IT">Energy IT</option>
            <option value="Energy Management">Energy Management</option>
            <option value="Energy Storage">Energy Storage</option>
            <option value="Engineering Firms">Engineering Firms</option>
            <option value="English-Speaking">English-Speaking</option>
            <option value="Enterprise 2.0">Enterprise 2.0</option>
            <option value="Enterprise Application"
              >Enterprise Application</option
            >
            <option value="Enterprise Hardware">Enterprise Hardware</option>
            <option value="Enterprise Purchasing">Enterprise Purchasing</option>
            <option value="Enterprise Resource Planning"
              >Enterprise Resource Planning</option
            >
            <option value="Enterprise Search">Enterprise Search</option>
            <option value="Enterprise Security">Enterprise Security</option>
            <option value="Enterprise Software">Enterprise Software</option>
            <option value="Enterprises">Enterprises</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Entertainment Industry"
              >Entertainment Industry</option
            >
            <option value="Entrepreneur">Entrepreneur</option>
            <option value="Environmental Innovation"
              >Environmental Innovation</option
            >
            <option value="Estimation and Quoting"
              >Estimation and Quoting</option
            >
            <option value="Event Management">Event Management</option>
            <option value="Events">Events</option>
            <option value="Exercise">Exercise</option>
            <option value="Experience Design">Experience Design</option>
            <option value="Eyewear">Eyewear</option>
            <option value="Face Recognition">Face Recognition</option>
            <option value="Facebook Applications">Facebook Applications</option>
            <option value="Families">Families</option>
            <option value="Fantasy Sports">Fantasy Sports</option>
            <option value="Farmers Market">Farmers Market</option>
            <option value="Farming">Farming</option>
            <option value="Fashion">Fashion</option>
            <option value="Fertility">Fertility</option>
            <option value="Field Support Services"
              >Field Support Services</option
            >
            <option value="File Sharing">File Sharing</option>
            <option value="Film">Film</option>
            <option value="Film Distribution">Film Distribution</option>
            <option value="Film Production">Film Production</option>
            <option value="Finance">Finance</option>
            <option value="Finance Technology">Finance Technology</option>
            <option value="Financial Exchanges">Financial Exchanges</option>
            <option value="Financial Services">Financial Services</option>
            <option value="FinTech">FinTech</option>
            <option value="Fitness">Fitness</option>
            <option value="Flash Sales">Flash Sales</option>
            <option value="Flash Storage">Flash Storage</option>
            <option value="Fleet Management">Fleet Management</option>
            <option value="Flowers">Flowers</option>
            <option value="Fmcg">Fmcg</option>
            <option value="Food Processing">Food Processing</option>
            <option value="Forums">Forums</option>
            <option value="Franchises">Franchises</option>
            <option value="Fraud Detection">Fraud Detection</option>
            <option value="Freelancers">Freelancers</option>
            <option value="Freemium">Freemium</option>
            <option value="FreetoPlay Gaming">FreetoPlay Gaming</option>
            <option value="Fruit">Fruit</option>
            <option value="Fuel Cells">Fuel Cells</option>
            <option value="Fuels">Fuels</option>
            <option value="Funeral Industry">Funeral Industry</option>
            <option value="Furniture">Furniture</option>
            <option value="Gadget">Gadget</option>
            <option value="Gambling">Gambling</option>
            <option value="Game">Game</option>
            <option value="Game Mechanics">Game Mechanics</option>
            <option value="Games">Games</option>
            <option value="Gamification">Gamification</option>
            <option value="Gas">Gas</option>
            <option value="Gay & Lesbian">Gay & Lesbian</option>
            <option value="General Public Worldwide"
              >General Public Worldwide</option
            >
            <option value="Generation Y-Z">Generation Y-Z</option>
            <option value="Genetic Testing">Genetic Testing</option>
            <option value="Geospatial">Geospatial</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Gift Exchange">Gift Exchange</option>
            <option value="Gift Registries">Gift Registries</option>
            <option value="Gold">Gold</option>
            <option value="Golf Equipment">Golf Equipment</option>
            <option value="Google Apps">Google Apps</option>
            <option value="Google Glass">Google Glass</option>
            <option value="Governance">Governance</option>
            <option value="Government Innovation">Government Innovation</option>
            <option value="Governments">Governments</option>
            <option value="Gps">Gps</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Graphics">Graphics</option>
            <option value="Green">Green</option>
            <option value="Green Building">Green Building</option>
            <option value="Green Consumer Goods">Green Consumer Goods</option>
            <option value="GreenTech">GreenTech</option>
            <option value="Groceries">Groceries</option>
            <option value="Group Buying">Group Buying</option>
            <option value="Group Email">Group Email</option>
            <option value="Group SMS">Group SMS</option>
            <option value="Guide to Nightlife">Guide to Nightlife</option>
            <option value="Guides">Guides</option>
            <option value="Handmade">Handmade</option>
            <option value="Hardware">Hardware</option>
            <option value="Hardware + Software">Hardware + Software</option>
            <option value="HDTV">HDTV</option>
            <option value="Health and Insurance">Health and Insurance</option>
            <option value="Health and Wellness">Health and Wellness</option>
            <option value="Health Care">Health Care</option>
            <option value="Health Care Information Technology"
              >Health Care Information Technology</option
            >
            <option value="Health Diagnostics">Health Diagnostics</option>
            <option value="Health Services Industry"
              >Health Services Industry</option
            >
            <option value="Healthcare Services">Healthcare Services</option>
            <option value="Heavy Industry">Heavy Industry</option>
            <option value="Hedge Funds">Hedge Funds</option>
            <option value="Hi Tech">Hi Tech</option>
            <option value="High School Students">High School Students</option>
            <option value="High Schools">High Schools</option>
            <option value="High Tech">High Tech</option>
            <option value="Hip Hop">Hip Hop</option>
            <option value="Home & Garden">Home & Garden</option>
            <option value="Home Automation">Home Automation</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Home Owners">Home Owners</option>
            <option value="Home Renovation">Home Renovation</option>
            <option value="Homeland Security">Homeland Security</option>
            <option value="Homeless Shelter">Homeless Shelter</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Hospitals">Hospitals</option>
            <option value="Hotels">Hotels</option>
            <option value="Human Computer Interaction"
              >Human Computer Interaction</option
            >
            <option value="Human Resource Automation"
              >Human Resource Automation</option
            >
            <option value="Human Resources">Human Resources</option>
            <option value="Humanitarian">Humanitarian</option>
            <option value="Hunting Industry">Hunting Industry</option>
            <option value="IaaS">IaaS</option>
            <option value="ICT">ICT</option>
            <option value="Identity">Identity</option>
            <option value="Identity Management">Identity Management</option>
            <option value="Image Recognition">Image Recognition</option>
            <option value="Impact Investing">Impact Investing</option>
            <option value="Incentives">Incentives</option>
            <option value="Incubators">Incubators</option>
            <option value="Independent Music">Independent Music</option>
            <option value="Independent Music Labels"
              >Independent Music Labels</option
            >
            <option value="Independent Pharmacies"
              >Independent Pharmacies</option
            >
            <option value="Indians">Indians</option>
            <option value="Indoor Positioning">Indoor Positioning</option>
            <option value="Industrial">Industrial</option>
            <option value="Industrial Automation">Industrial Automation</option>
            <option value="Industrial Energy Efficiency"
              >Industrial Energy Efficiency</option
            >
            <option value="In-Flight Entertainment"
              >In-Flight Entertainment</option
            >
            <option value="Information Security">Information Security</option>
            <option value="Information Services">Information Services</option>
            <option value="Information Technology"
              >Information Technology</option
            >
            <option value="Infrastructure">Infrastructure</option>
            <option value="Infrastructure Builders"
              >Infrastructure Builders</option
            >
            <option value="Innovation Engineering"
              >Innovation Engineering</option
            >
            <option value="Innovation Management">Innovation Management</option>
            <option value="Insurance">Insurance</option>
            <option value="Insurance Companies">Insurance Companies</option>
            <option value="Intellectual Asset Management"
              >Intellectual Asset Management</option
            >
            <option value="Intellectual Property">Intellectual Property</option>
            <option value="Intelligent Systems">Intelligent Systems</option>
            <option value="Interest Graph">Interest Graph</option>
            <option value="Interface Design">Interface Design</option>
            <option value="Interior Design">Interior Design</option>
            <option value="Internet">Internet</option>
            <option value="Internet Infrastructure"
              >Internet Infrastructure</option
            >
            <option value="Internet Marketing">Internet Marketing</option>
            <option value="Internet of Things">Internet of Things</option>
            <option value="Internet Radio Market">Internet Radio Market</option>
            <option value="Internet Service Providers"
              >Internet Service Providers</option
            >
            <option value="Internet Technology">Internet Technology</option>
            <option value="Internet TV">Internet TV</option>
            <option value="Investment Management">Investment Management</option>
            <option value="iOS">iOS</option>
            <option value="iPad">iPad</option>
            <option value="iPhone">iPhone</option>
            <option value="iPod Touch">iPod Touch</option>
            <option value="IT and Cybersecurity">IT and Cybersecurity</option>
            <option value="IT Management">IT Management</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Journalism">Journalism</option>
            <option value="K-12 Education">K-12 Education</option>
            <option value="Kids">Kids</option>
            <option value="Kinect">Kinect</option>
            <option value="Knowledge Management">Knowledge Management</option>
            <option value="Labor Optimization">Labor Optimization</option>
            <option value="Landscaping">Landscaping</option>
            <option value="Language Learning">Language Learning</option>
            <option value="Lasers">Lasers</option>
            <option value="Law Enforcement">Law Enforcement</option>
            <option value="Lead Generation">Lead Generation</option>
            <option value="Lead Management">Lead Management</option>
            <option value="Legal">Legal</option>
            <option value="Leisure">Leisure</option>
            <option value="Licensing">Licensing</option>
            <option value="Life Sciences">Life Sciences</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Lifestyle Businesses">Lifestyle Businesses</option>
            <option value="Lifestyle Products">Lifestyle Products</option>
            <option value="Lighting">Lighting</option>
            <option value="Limousines">Limousines</option>
            <option value="Lingerie">Lingerie</option>
            <option value="Linux">Linux</option>
            <option value="Local">Local</option>
            <option value="Local Advertising">Local Advertising</option>
            <option value="Local Based Services">Local Based Services</option>
            <option value="Local Businesses">Local Businesses</option>
            <option value="Local Commerce">Local Commerce</option>
            <option value="Local Coupons">Local Coupons</option>
            <option value="Local Search">Local Search</option>
            <option value="Local Services">Local Services</option>
            <option value="Location Based Services"
              >Location Based Services</option
            >
            <option value="Logistics">Logistics</option>
            <option value="Logistics Company">Logistics Company</option>
            <option value="Lotteries">Lotteries</option>
            <option value="Low Bid Auctions">Low Bid Auctions</option>
            <option value="Loyalty Programs">Loyalty Programs</option>
            <option value="M2M">M2M</option>
            <option value="Mac">Mac</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Made in Italy">Made in Italy</option>
            <option value="Management">Management</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Maps">Maps</option>
            <option value="Market Research">Market Research</option>
            <option value="Marketing Automation">Marketing Automation</option>
            <option value="Marketplaces">Marketplaces</option>
            <option value="Mass Customization">Mass Customization</option>
            <option value="Match-Making">Match-Making</option>
            <option value="Material Science">Material Science</option>
            <option value="Mechanical Solutions">Mechanical Solutions</option>
            <option value="Media">Media</option>
            <option value="Media|Software|Tracking|Web"
              >Media|Software|Tracking|Web</option
            >
            <option value="Medical">Medical</option>
            <option value="Medical Devices">Medical Devices</option>
            <option value="Medical Professionals">Medical Professionals</option>
            <option value="Medication Adherence">Medication Adherence</option>
            <option value="Meeting Software">Meeting Software</option>
            <option value="Mens Specific">Mens Specific</option>
            <option value="Messaging">Messaging</option>
            <option value="mHealth">mHealth</option>
            <option value="MicroBlogging">MicroBlogging</option>
            <option value="Micro-Enterprises">Micro-Enterprises</option>
            <option value="Minerals">Minerals</option>
            <option value="Mining Technologies">Mining Technologies</option>
            <option value="MMO Games">MMO Games</option>
            <option value="Mobile">Mobile</option>
            <option value="Mobile Advertising">Mobile Advertising</option>
            <option value="Mobile Analytics">Mobile Analytics</option>
            <option value="Mobile Commerce">Mobile Commerce</option>
            <option value="Mobile Coupons">Mobile Coupons</option>
            <option value="Mobile Devices">Mobile Devices</option>
            <option value="Mobile Emergency&Health"
              >Mobile Emergency&Health</option
            >
            <option value="Mobile Enterprise">Mobile Enterprise</option>
            <option value="Mobile Games">Mobile Games</option>
            <option value="Mobile Health">Mobile Health</option>
            <option value="Mobile Infrastructure">Mobile Infrastructure</option>
            <option value="Mobile Payments">Mobile Payments</option>
            <option value="Mobile Search">Mobile Search</option>
            <option value="Mobile Security">Mobile Security</option>
            <option value="Mobile Shopping">Mobile Shopping</option>
            <option value="Mobile Social">Mobile Social</option>
            <option value="Mobile Software Tools">Mobile Software Tools</option>
            <option value="Mobile Video">Mobile Video</option>
            <option value="Mobility">Mobility</option>
            <option value="Monetization">Monetization</option>
            <option value="Moneymaking">Moneymaking</option>
            <option value="Mothers">Mothers</option>
            <option value="Motion Capture">Motion Capture</option>
            <option value="Motors">Motors</option>
            <option value="Multi-level Marketing">Multi-level Marketing</option>
            <option value="Music">Music</option>
            <option value="Music Education">Music Education</option>
            <option value="Music Services">Music Services</option>
            <option value="Music Venues">Music Venues</option>
            <option value="Musical Instruments">Musical Instruments</option>
            <option value="Musicians">Musicians</option>
            <option value="Nanotechnology">Nanotechnology</option>
            <option value="Natural Gas Uses">Natural Gas Uses</option>
            <option value="Natural Language Processing"
              >Natural Language Processing</option
            >
            <option value="Natural Resources">Natural Resources</option>
            <option value="Navigation">Navigation</option>
            <option value="Network Security">Network Security</option>
            <option value="Networking">Networking</option>
            <option value="Neuroscience">Neuroscience</option>
            <option value="New Product Development"
              >New Product Development</option
            >
            <option value="New Technologies">New Technologies</option>
            <option value="News">News</option>
            <option value="NFC">NFC</option>
            <option value="Nightclubs">Nightclubs</option>
            <option value="Nightlife">Nightlife</option>
            <option value="Non Profit">Non Profit</option>
            <option value="Nonprofits">Nonprofits</option>
            <option value="Non-Tech">Non-Tech</option>
            <option value="Nutraceutical">Nutraceutical</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Office Space">Office Space</option>
            <option value="Offline Businesses">Offline Businesses</option>
            <option value="Oil">Oil</option>
            <option value="Oil & Gas">Oil & Gas</option>
            <option value="Oil and Gas">Oil and Gas</option>
            <option value="Online Auctions">Online Auctions</option>
            <option value="Online Dating">Online Dating</option>
            <option value="Online Education">Online Education</option>
            <option value="Online Gaming">Online Gaming</option>
            <option value="Online Identity">Online Identity</option>
            <option value="Online Rental">Online Rental</option>
            <option value="Online Reservations">Online Reservations</option>
            <option value="Online Scheduling">Online Scheduling</option>
            <option value="Online Shopping">Online Shopping</option>
            <option value="Online Travel">Online Travel</option>
            <option value="Online Video Advertising"
              >Online Video Advertising</option
            >
            <option value="Open Source">Open Source</option>
            <option value="Operating Systems">Operating Systems</option>
            <option value="Opinions">Opinions</option>
            <option value="Optical Communications"
              >Optical Communications</option
            >
            <option value="Optimization">Optimization</option>
            <option value="Organic">Organic</option>
            <option value="Organic Food">Organic Food</option>
            <option value="Outdoor Advertising">Outdoor Advertising</option>
            <option value="Outdoors">Outdoors</option>
            <option value="Outsourcing">Outsourcing</option>
            <option value="P2P Money Transfer">P2P Money Transfer</option>
            <option value="PaaS">PaaS</option>
            <option value="Parenting">Parenting</option>
            <option value="Parking">Parking</option>
            <option value="Payments">Payments</option>
            <option value="PC Gaming">PC Gaming</option>
            <option value="Peer-to-Peer">Peer-to-Peer</option>
            <option value="Performance Marketing">Performance Marketing</option>
            <option value="Performing Arts">Performing Arts</option>
            <option value="Personal Branding">Personal Branding</option>
            <option value="Personal Data">Personal Data</option>
            <option value="Personal Finance">Personal Finance</option>
            <option value="Personal Health">Personal Health</option>
            <option value="Personalization">Personalization</option>
            <option value="Pervasive Computing">Pervasive Computing</option>
            <option value="Pets">Pets</option>
            <option value="Pharmaceuticals">Pharmaceuticals</option>
            <option value="Photo Editing">Photo Editing</option>
            <option value="Photo Sharing">Photo Sharing</option>
            <option value="Photography">Photography</option>
            <option value="Physical Security">Physical Security</option>
            <option value="Physicians">Physicians</option>
            <option value="Plumbers">Plumbers</option>
            <option value="Podcast">Podcast</option>
            <option value="Point of Sale">Point of Sale</option>
            <option value="Politics">Politics</option>
            <option value="Polling">Polling</option>
            <option value="Portals">Portals</option>
            <option value="Postal and Courier Services"
              >Postal and Courier Services</option
            >
            <option value="Pre Seed">Pre Seed</option>
            <option value="Prediction Markets">Prediction Markets</option>
            <option value="Predictive Analytics">Predictive Analytics</option>
            <option value="Presence">Presence</option>
            <option value="Presentations">Presentations</option>
            <option value="Price Comparison">Price Comparison</option>
            <option value="Printing">Printing</option>
            <option value="Privacy">Privacy</option>
            <option value="Private Corrections">Private Corrections</option>
            <option value="Private School">Private School</option>
            <option value="Private Social Networking"
              >Private Social Networking</option
            >
            <option value="Procurement">Procurement</option>
            <option value="Product Design">Product Design</option>
            <option value="Product Development Services"
              >Product Development Services</option
            >
            <option value="Product Search">Product Search</option>
            <option value="Productivity">Productivity</option>
            <option value="Productivity Software">Productivity Software</option>
            <option value="Professional Networking"
              >Professional Networking</option
            >
            <option value="Professional Services">Professional Services</option>
            <option value="Project Management">Project Management</option>
            <option value="Promotional">Promotional</option>
            <option value="Property Management">Property Management</option>
            <option value="Proximity Internet">Proximity Internet</option>
            <option value="Psychology">Psychology</option>
            <option value="Public Relations">Public Relations</option>
            <option value="Public Safety">Public Safety</option>
            <option value="Public Transportation">Public Transportation</option>
            <option value="Publishing">Publishing</option>
            <option value="Q&A">Q&A</option>
            <option value="QR Codes">QR Codes</option>
            <option value="Quantified Self">Quantified Self</option>
            <option value="Quantitative Marketing"
              >Quantitative Marketing</option
            >
            <option value="Racing">Racing</option>
            <option value="Radical Breakthrough Startups"
              >Radical Breakthrough Startups</option
            >
            <option value="Rapidly Expanding">Rapidly Expanding</option>
            <option value="Reading Apps">Reading Apps</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Real Estate Investors">Real Estate Investors</option>
            <option value="Real Time">Real Time</option>
            <option value="Realtors">Realtors</option>
            <option value="Recipes">Recipes</option>
            <option value="Recreation">Recreation</option>
            <option value="Recruiting">Recruiting</option>
            <option value="Recycling">Recycling</option>
            <option value="Registrars">Registrars</option>
            <option value="Rehabilitation">Rehabilitation</option>
            <option value="Religion">Religion</option>
            <option value="Remediation">Remediation</option>
            <option value="Renewable Energies">Renewable Energies</option>
            <option value="Renewable Tech">Renewable Tech</option>
            <option value="Rental Housing">Rental Housing</option>
            <option value="Reputation">Reputation</option>
            <option value="Residential Solar">Residential Solar</option>
            <option value="Resorts">Resorts</option>
            <option value="Restaurants">Restaurants</option>
            <option value="Retail">Retail</option>
            <option value="Retail Technology">Retail Technology</option>
            <option value="Retirement">Retirement</option>
            <option value="Reviews and Recommendations"
              >Reviews and Recommendations</option
            >
            <option value="RFID">RFID</option>
            <option value="Ride Sharing">Ride Sharing</option>
            <option value="RIM">RIM</option>
            <option value="Risk Management">Risk Management</option>
            <option value="Robotics">Robotics</option>
            <option value="Rural Energy">Rural Energy</option>
            <option value="SaaS">SaaS</option>
            <option value="Sailing Community">Sailing Community</option>
            <option value="Sales and Marketing">Sales and Marketing</option>
            <option value="Sales Automation">Sales Automation</option>
            <option value="Salesforce Killers">Salesforce Killers</option>
            <option value="Search">Search</option>
            <option value="Search Marketing">Search Marketing</option>
            <option value="Security">Security</option>
            <option value="Self Development">Self Development</option>
            <option value="Self Storage">Self Storage</option>
            <option value="Semantic Search">Semantic Search</option>
            <option value="Semantic Web">Semantic Web</option>
            <option value="Semiconductor Manufacturing Equipment"
              >Semiconductor Manufacturing Equipment</option
            >
            <option value="Semiconductors">Semiconductors</option>
            <option value="Senior Citizens">Senior Citizens</option>
            <option value="Senior Health">Senior Health</option>
            <option value="Sensors">Sensors</option>
            <option value="SEO">SEO</option>
            <option value="Serious Games">Serious Games</option>
            <option value="Service Industries">Service Industries</option>
            <option value="Service Providers">Service Providers</option>
            <option value="Services">Services</option>
            <option value="Sex Industry">Sex Industry</option>
            <option value="SexTech">SexTech</option>
            <option value="Shared Services">Shared Services</option>
            <option value="Shipping">Shipping</option>
            <option value="Shipping Broker Industry"
              >Shipping Broker Industry</option
            >
            <option value="Shoes">Shoes</option>
            <option value="Shopping">Shopping</option>
            <option value="Simulation">Simulation</option>
            <option value="Skate Wear">Skate Wear</option>
            <option value="Skill Assessment">Skill Assessment</option>
            <option value="Skill Gaming">Skill Gaming</option>
            <option value="Small and Medium Businesses"
              >Small and Medium Businesses</option
            >
            <option value="Smart Building">Smart Building</option>
            <option value="Smart Grid">Smart Grid</option>
            <option value="SMS">SMS</option>
            <option value="SNS">SNS</option>
            <option value="Soccer">Soccer</option>
            <option value="Social + Mobile + Local"
              >Social + Mobile + Local</option
            >
            <option value="Social Activists">Social Activists</option>
            <option value="Social Bookmarking">Social Bookmarking</option>
            <option value="Social Business">Social Business</option>
            <option value="Social Buying">Social Buying</option>
            <option value="Social Commerce">Social Commerce</option>
            <option value="Social CRM">Social CRM</option>
            <option value="Social Entrepreneurship"
              >Social Entrepreneurship</option
            >
            <option value="Social Fundraising">Social Fundraising</option>
            <option value="Social Games">Social Games</option>
            <option value="Social Innovation">Social Innovation</option>
            <option value="Social Investing">Social Investing</option>
            <option value="Social Media">Social Media</option>
            <option value="Social Media Advertising"
              >Social Media Advertising</option
            >
            <option value="Social Media Agent">Social Media Agent</option>
            <option value="Social Media Management"
              >Social Media Management</option
            >
            <option value="Social Media Marketing"
              >Social Media Marketing</option
            >
            <option value="Social Media Monitoring"
              >Social Media Monitoring</option
            >
            <option value="Social Media Platforms"
              >Social Media Platforms</option
            >
            <option value="Social Network Media">Social Network Media</option>
            <option value="Social News">Social News</option>
            <option value="Social Opinion Platform"
              >Social Opinion Platform</option
            >
            <option value="Social Recruiting">Social Recruiting</option>
            <option value="Social Search">Social Search</option>
            <option value="Social Television">Social Television</option>
            <option value="Social Travel">Social Travel</option>
            <option value="Software">Software</option>
            <option value="Software Compliance">Software Compliance</option>
            <option value="Solar">Solar</option>
            <option value="South East Asia">South East Asia</option>
            <option value="Space Travel">Space Travel</option>
            <option value="Spam Filtering">Spam Filtering</option>
            <option value="Spas">Spas</option>
            <option value="Specialty Chemicals">Specialty Chemicals</option>
            <option value="Specialty Foods">Specialty Foods</option>
            <option value="Specialty Retail">Specialty Retail</option>
            <option value="Speech Recognition">Speech Recognition</option>
            <option value="Sponsorship">Sponsorship</option>
            <option value="Sporting Goods">Sporting Goods</option>
            <option value="Sports">Sports</option>
            <option value="Sports Stadiums">Sports Stadiums</option>
            <option value="Staffing Firms">Staffing Firms</option>
            <option value="Startups">Startups</option>
            <option value="Stock Exchanges">Stock Exchanges</option>
            <option value="Storage">Storage</option>
            <option value="Subscription Businesses"
              >Subscription Businesses</option
            >
            <option value="Subscription Service">Subscription Service</option>
            <option value="Sunglasses">Sunglasses</option>
            <option value="Supply Chain Management"
              >Supply Chain Management</option
            >
            <option value="Surfing Community">Surfing Community</option>
            <option value="Surveys">Surveys</option>
            <option value="Sustainability">Sustainability</option>
            <option value="Swimming">Swimming</option>
            <option value="Synchronization">Synchronization</option>
            <option value="Systems">Systems</option>
            <option value="Tablets">Tablets</option>
            <option value="Task Management">Task Management</option>
            <option value="Taxis">Taxis</option>
            <option value="Tea">Tea</option>
            <option value="Teachers">Teachers</option>
            <option value="Teaching STEM Concepts"
              >Teaching STEM Concepts</option
            >
            <option value="Tech Field Support">Tech Field Support</option>
            <option value="Technical Continuing Education"
              >Technical Continuing Education</option
            >
            <option value="Technology">Technology</option>
            <option value="Teenagers">Teenagers</option>
            <option value="Telecommunications">Telecommunications</option>
            <option value="Telephony">Telephony</option>
            <option value="Television">Television</option>
            <option value="Temporary Staffing">Temporary Staffing</option>
            <option value="Test and Measurement">Test and Measurement</option>
            <option value="Testing">Testing</option>
            <option value="Text Analytics">Text Analytics</option>
            <option value="Textbooks">Textbooks</option>
            <option value="Textiles">Textiles</option>
            <option value="Theatre">Theatre</option>
            <option value="Therapeutics">Therapeutics</option>
            <option value="Ticketing">Ticketing</option>
            <option value="Timeshares">Timeshares</option>
            <option value="Tourism">Tourism</option>
            <option value="Toys">Toys</option>
            <option value="Tracking">Tracking</option>
            <option value="Trading">Trading</option>
            <option value="Training">Training</option>
            <option value="Transaction Processing"
              >Transaction Processing</option
            >
            <option value="Translation">Translation</option>
            <option value="Transportation">Transportation</option>
            <option value="Travel">Travel</option>
            <option value="Travel & Tourism">Travel & Tourism</option>
            <option value="Trusted Networks">Trusted Networks</option>
            <option value="Tutoring">Tutoring</option>
            <option value="TV Production">TV Production</option>
            <option value="Twin-Tip Skis">Twin-Tip Skis</option>
            <option value="Twitter Applications">Twitter Applications</option>
            <option value="Underserved Children">Underserved Children</option>
            <option value="Unifed Communications">Unifed Communications</option>
            <option value="Universities">Universities</option>
            <option value="University Students">University Students</option>
            <option value="Unmanned Air Systems">Unmanned Air Systems</option>
            <option value="Usability">Usability</option>
            <option value="User Experience Design"
              >User Experience Design</option
            >
            <option value="User Interface">User Interface</option>
            <option value="User Testing">User Testing</option>
            <option value="Utilities">Utilities</option>
            <option value="Utility Land Vehicles">Utility Land Vehicles</option>
            <option value="UV LEDs">UV LEDs</option>
            <option value="Vacation Rentals">Vacation Rentals</option>
            <option value="Vending and Concessions"
              >Vending and Concessions</option
            >
            <option value="Venture Capital">Venture Capital</option>
            <option value="Ventures for Good">Ventures for Good</option>
            <option value="Vertical Search">Vertical Search</option>
            <option value="Veterinary">Veterinary</option>
            <option value="Video">Video</option>
            <option value="Video Chat">Video Chat</option>
            <option value="Video Conferencing">Video Conferencing</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Video Game Tournaments"
              >Video Game Tournaments</option
            >
            <option value="Video Games">Video Games</option>
            <option value="Video on Demand">Video on Demand</option>
            <option value="Video Processing">Video Processing</option>
            <option value="Video Streaming">Video Streaming</option>
            <option value="Virtual Currency">Virtual Currency</option>
            <option value="Virtual Desktop">Virtual Desktop</option>
            <option value="Virtual Goods">Virtual Goods</option>
            <option value="Virtual Workforces">Virtual Workforces</option>
            <option value="Virtual Worlds">Virtual Worlds</option>
            <option value="Virtualization">Virtualization</option>
            <option value="Visual Search">Visual Search</option>
            <option value="Visualization">Visualization</option>
            <option value="VoIP">VoIP</option>
            <option value="Vulnerability Management"
              >Vulnerability Management</option
            >
            <option value="Waste Management">Waste Management</option>
            <option value="Watch">Watch</option>
            <option value="Water">Water</option>
            <option value="Water Purification">Water Purification</option>
            <option value="Wealth Management">Wealth Management</option>
            <option value="Wearables">Wearables</option>
            <option value="Web Browsers">Web Browsers</option>
            <option value="Web CMS">Web CMS</option>
            <option value="Web Design">Web Design</option>
            <option value="Web Development">Web Development</option>
            <option value="Web Hosting">Web Hosting</option>
            <option value="Web Presence Management"
              >Web Presence Management</option
            >
            <option value="Web Tools">Web Tools</option>
            <option value="WebOS">WebOS</option>
            <option value="Weddings">Weddings</option>
            <option value="West Africa">West Africa</option>
            <option value="Wholesale">Wholesale</option>
            <option value="Wind">Wind</option>
            <option value="Windows Phone 7">Windows Phone 7</option>
            <option value="Wine And Spirits">Wine And Spirits</option>
            <option value="Wireless">Wireless</option>
            <option value="Women">Women</option>
            <option value="Writers">Writers</option>
            <option value="Young Adults">Young Adults</option>
          </select>
        </div>

        <button type="button" class="next-btn">Next</button>
      </div>

      <div class="step step-2 bg-kick-gold">
        <div class="form-group bg-kick-gold">
          <label for="fundingRounds" class="bg-kick-gold"
            >Number of funding rounds completed
          </label>
          <input
            type="text"
            id="fundingRounds"
            name="fundingRounds"
            bind:value={fundingRounds}
            on:change={createDateDivs}
          />
        </div>

        <div class="form-group bg-kick-gold">
          <label for="fundsRaised" class="bg-kick-gold"
            >Total Funding Amount Raised in USD</label
          >
          <input type="text" id="fundsRaised" name="fundsRaised" />
        </div>

        <div class="input-group date form-group bg-kick-gold" id="datepicker">
          <label for="fundsRaised" class="bg-kick-gold"
            >Enter the dates from the first - latest funding rounds</label
          >
        </div>

        <button type="button" class="previous-btn">Prev</button>
        <!-- <button type="submit" class="submit-btn">Save</button> -->
        <button type="button" class="next-btn">Next</button>
      </div>

      <div class="step step-3 bg-kick-gold">
        <div class="form-group bg-kick-gold">
          <label for="advertLabel" class="bg-kick-gold text-xl font-semibold"
            >Does the company have an advert label?
          </label>
          <br />
          <div class="flex bg-kick-gold">
            <label
              for="advertYes"
              class="inline bg-kick-gold text-kick-black font-semibold"
              >Yes</label
            >
            <input
              type="radio"
              name="advert"
              id="advertYes"
              class="inline -ml-36"
              value="true"
            />
          </div>
          <div class="flex bg-kick-gold">
            <label
              for="advertNo"
              class="inline bg-kick-gold text-kick-black font-semibold"
              >No&nbsp;</label
            >
            <input
              type="radio"
              name="advert"
              id="advertNo"
              class="inline -ml-36"
              value="false"
            />
          </div>
        </div>

        <div class="form-group bg-kick-gold">
          <label
            for="firstFundingAge"
            class="bg-kick-gold text-xl font-semibold"
            >Age of the company when it received it's first funding</label
          >
          <input type="text" id="firstFundingAge" name="firstFundingAge" />
        </div>

        <div class="form-group bg-kick-gold">
          <label for="crm" class="bg-kick-gold text-xl font-semibold"
            >On a scale of 1-100 , enter the company's relationship with it's
            clients</label
          >
          <input type="text" id="crm" name="crm" />
        </div>

        <button type="button" class="previous-btn">Prev</button>
        <button type="button" class="next-btn">Next</button>

        <!-- <button type="submit" class="submit-btn">Submit</button> -->
      </div>

      <div class="step step-4 bg-kick-gold">
        <div class="form-group bg-kick-gold">
          <label
            for="firstMilestoneAge"
            class="bg-kick-gold text-xl font-semibold"
            >Age of the company when it reached it's first milestone</label
          >
          <input type="text" id="firstMilestoneAge" name="firstMilestoneAge" />
        </div>

        <div class="form-group bg-kick-gold">
          <label for="milestoneCount" class="bg-kick-gold text-xl font-semibold"
            >Number of significant milestones recorded by the company</label
          >
          <input type="text" id="milestoneCount" name="milestoneCount" />
        </div>

        <div class="form-group bg-kick-gold">
          <label for="workforce" class="bg-kick-gold text-xl font-semibold"
            >Number of employees in the company</label
          >
          <input type="text" id="workforce" name="workforce" />
        </div>

        <button type="button" class="previous-btn">Prev</button>
        <button type="button" class="next-btn">Next</button>

        <!-- <button type="submit" class="submit-btn">Submit</button> -->
      </div>

      <div class="step step-5 bg-kick-gold">
        <div class="form-group bg-kick-gold">
          <label
            for="topCompanyLabel"
            class="bg-kick-gold text-xl font-semibold"
            >Is the company presently listed amongst top 500 companies across
            the world/country?
          </label>
          <br />
          <div class="flex bg-kick-gold">
            <label
              for="topCompanyYes"
              class="inline bg-kick-gold text-kick-black font-semibold"
              >Yes</label
            >
            <input
              type="radio"
              name="topCompany"
              id="topCompanyYes"
              class="inline -ml-36"
              value="true"
            />
          </div>
          <div class="flex bg-kick-gold">
            <label
              for="topCompanyNo"
              class="inline bg-kick-gold text-kick-black font-semibold"
              >No&nbsp;</label
            >
            <input
              type="radio"
              name="topCompany"
              id="topCompanyNo"
              class="inline -ml-36"
              value="false"
            />
          </div>
        </div>

        <div class="form-group bg-kick-gold">
          <label
            for="secondRoundLabel"
            class="bg-kick-gold text-xl font-semibold"
            >Has the company received second round of funding?
          </label>
          <br />
          <div class="flex bg-kick-gold">
            <label
              for="secondRoundYes"
              class="inline bg-kick-gold text-kick-black font-semibold"
              >Yes</label
            >
            <input
              type="radio"
              name="secondRound"
              id="secondRoundYes"
              class="inline -ml-36"
              value="true"
            />
          </div>
          <div class="flex bg-kick-gold">
            <label
              for="seondRoundNo"
              class="inline bg-kick-gold text-kick-black font-semibold"
              >No&nbsp;</label
            >
            <input
              type="radio"
              name="secondRound"
              id="secondRoundNo"
              class="inline -ml-36"
              value="false"
            />
          </div>
        </div>

        <button type="button" class="previous-btn">Prev</button>
        <!-- <button type="button" class="next-btn">Next</button> -->

        <button type="submit" class="submit-btn">Save</button>
      </div>
    </form>
  </div>
</section>

<style>
  section {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: #cbb26a; */
  }
  .container {
    max-width: 400px;
    width: 90%;
    padding: 20px;
    /* box-shadow: 0px 0px 20px #00000020; */
    border-radius: 8px;
    background-color: #cbb26a;
    transition: 2s;
  }

  .container:hover {
    box-shadow: 0 0 45px #cbb26a;
    transition: 800ms;
  }
  .step {
    display: none;
  }
  .step.active {
    display: block;
  }
  .form-group {
    width: 100%;
    margin-top: 20px;
  }
  .form-group input {
    width: 100%;
    border: 1.5px solid rgba(128, 128, 128, 0.418);
    padding: 5px;
    font-size: 18px;
    margin-top: 5px;
    border-radius: 4px;
  }

  button.next-btn,
  button.previous-btn,
  button.submit-btn {
    float: right;
    margin-top: 20px;
    padding: 10px 30px;
    outline: none;
    background-color: #1a1a1a;
    font-size: 18px;
    cursor: pointer;
    border-radius: 20px;
    transition: 1s;
    border: 2px solid #1a1a1a;
    /* text-align: right; */
  }
  button.previous-btn {
    float: left;
    border: 2px solid #1a1a1a;
    transition: 1s;
  }
  button.submit-btn {
    background-color: #1b9c85;
    border: 2px solid #1b9c85;
  }

  button.submit-btn:hover {
    border: 2px solid white;
    transition: 1s;
  }

  button.previous-btn:hover,
  button.next-btn:hover {
    border: 2px solid white;
    transition: 1s;
  }
</style>
