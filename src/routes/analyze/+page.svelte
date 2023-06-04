<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { user } from "../../store";
  import MultiSelect from "svelte-multiselect";
  let steps,
    nextBtn,
    prevBtn,
    form,
    fundingRounds = 0,
    dateElement,
    inputElement,
    doc;

  let items = [
    "3D",
    "3D Printing",
    "Adaptive Equipment",
    "Advertising Exchanges",
    "Advertising Networks",
    "Advertising Platforms",
    "Aerospace",
    "Air Pollution Control",
    "Algorithms",
    "Alternative Medicine",
    "Alumni",
    "Analytics",
    "Angels",
    "Animal Feed",
    "Anything Capital Intensive",
    "App Discovery",
    "App Marketing",
    "App Stores",
    "Application Platforms",
    "Apps",
    "Aquaculture",
    "Architecture",
    "Archiving",
    "Art",
    "Artificial Intelligence",
    "Artists Globally",
    "Assisitive Technology",
    "Assisted Living",
    "Auctions",
    "Audio",
    "Audiobooks",
    "Augmented Reality",
    "Auto",
    "Automated Kiosk",
    "Automotive",
    "B2B",
    "B2B Express Delivery",
    "Babies",
    "Baby Accessories",
    "Baby Boomers",
    "Baby Safety",
    "Banking",
    "Batteries",
    "Beauty",
    "Bicycles",
    "Big Data",
    "Big Data Analytics",
    "Billing",
    "Biofuels",
    "Bioinformatics",
    "Biomass Power Generation",
    "Biometrics",
    "Bio-Pharm",
    "Biotechnology",
    "Biotechnology and Semiconductor",
    "Bitcoin",
    "Blogging Platforms",
    "Boating Industry",
    "BPO Services",
    "Brand Marketing",
    "Brewing",
    "Bridging Online and Offline",
    "Broadcasting",
    "Brokers",
    "Browser Extensions",
    "Building Owners",
    "Building Products",
    "Business Analytics",
    "Business Development",
    "Business Information Systems",
    "Business Intelligence",
    "Business Productivity",
    "Business Services",
    "Business Travelers",
    "Cable",
    "CAD",
    "Call Center Automation",
    "Cannabis",
    "Carbon",
    "Career Management",
    "Career Planning",
    "Cars",
    "Casual Games",
    "Cause Marketing",
    "Celebrity",
    "Certification Test",
    "Charities",
    "Charity",
    "Charter Schools",
    "Chat",
    "Chemicals",
    "Child Care",
    "China Internet",
    "Civil Engineers",
    "Classifieds",
    "Clean Energy",
    "Clean Technology",
    "Clean Technology IT",
    "Clinical Trials",
    "Cloud Computing",
    "Cloud Data Services",
    "Cloud Infrastructure",
    "Cloud Management",
    "Cloud Security",
    "Cloud-Based Music",
    "Coffee",
    "Collaboration",
    "Collaborative Consumption",
    "Collectibles",
    "College Campuses",
    "College Recruiting",
    "Colleges",
    "Comics",
    "Commercial Real Estate",
    "Commercial Solar",
    "Commodities",
    "Communications Hardware",
    "Communications Infrastructure",
    "Communities",
    "Comparison Shopping",
    "Computer Vision",
    "Computers",
    "Concentrated Solar Power",
    "Concerts",
    "Console Gaming",
    "Construction",
    "Consulting",
    "Consumer Behavior",
    "Consumer Electronics",
    "Consumer Goods",
    "Consumer Internet",
    "Consumer Lending",
    "Consumers",
    "Contact Centers",
    "Contact Management",
    "Content",
    "Content Creators",
    "Content Delivery",
    "Content Discovery",
    "Content Syndication",
    "Contests",
    "Cooking",
    "Corporate IT",
    "Corporate Training",
    "Corporate Wellness",
    "Cosmetic Surgery",
    "Cosmetics",
    "Coupons",
    "Coworking",
    "Craft Beer",
    "Creative",
    "Creative Industries",
    "Credit",
    "Credit Cards",
    "CRM",
    "Crowdfunding",
    "Crowdsourcing",
    "Cryptocurrency",
    "Curated Web",
    "Custom Retail",
    "Customer Service",
    "Customer Support Tools",
    "Cyber",
    "Cyber Security",
    "Data Center Automation",
    "Data Center Infrastructure",
    "Data Centers",
    "Data Integration",
    "Data Mining",
    "Data Privacy",
    "Data Security",
    "Data Visualization",
    "Databases",
    "Debt Collecting",
    "Deep Information Technology",
    "Defense",
    "Delivery",
    "Demographies",
    "Dental",
    "Design",
    "Designers",
    "Developer APIs",
    "Developer Tools",
    "Development Platforms",
    "Diabetes",
    "Diagnostics",
    "Dietary Supplements",
    "Digital Entertainment",
    "Digital Media",
    "Digital Rights Management",
    "Digital Signage",
    "Direct Advertising",
    "Direct Marketing",
    "Direct Sales",
    "Discounts",
    "Displays",
    "Disruptive Models",
    "Distribution",
    "Distributors",
    "Diving",
    "DIY",
    "Doctors",
    "Document Management",
    "DOD/Military",
    "Domains",
    "Drones",
    "Early Stage IT",
    "Early-Stage Technology",
    "East Africa",
    "EBooks",
    "E-Books",
    "E-Commerce",
    "E-Commerce Platforms",
    "EDA Tools",
    "Ediscovery",
    "EdTech",
    "Education",
    "Educational Games",
    "Edutainment",
    "Elder Care",
    "Elderly",
    "Electric Vehicles",
    "Electrical Distribution",
    "Electronic Health Records",
    "Electronics",
    "Email",
    "Email Marketing",
    "Email Newsletters",
    "Embedded Hardware and Software",
    "Emerging Markets",
    "Employer Benefits Programs",
    "Employment",
    "Energy",
    "Energy Efficiency",
    "Energy IT",
    "Energy Management",
    "Energy Storage",
    "Engineering Firms",
    "English-Speaking",
    "Enterprise 2.0",
    "Enterprise Application",
    "Enterprise Hardware",
    "Enterprise Purchasing",
    "Enterprise Resource Planning",
    "Enterprise Search",
    "Enterprise Security",
    "Enterprise Software",
    "Enterprises",
    "Entertainment",
    "Entertainment Industry",
    "Entrepreneur",
    "Environmental Innovation",
    "Estimation and Quoting",
    "Event Management",
    "Events",
    "Exercise",
    "Experience Design",
    "Eyewear",
    "Face Recognition",
    "Facebook Applications",
    "Families",
    "Fantasy Sports",
    "Farmers Market",
    "Farming",
    "Fashion",
    "Fertility",
    "Field Support Services",
    "File Sharing",
    "Film",
    "Film Distribution",
    "Film Production",
    "Finance",
    "Finance Technology",
    "Financial Exchanges",
    "Financial Services",
    "FinTech",
    "Fitness",
    "Flash Sales",
    "Flash Storage",
    "Fleet Management",
    "Flowers",
    "Fmcg",
    "Food Processing",
    "Forums",
    "Franchises",
    "Fraud Detection",
    "Freelancers",
    "Freemium",
    "FreetoPlay Gaming",
    "Fruit",
    "Fuel Cells",
    "Fuels",
    "Funeral Industry",
    "Furniture",
    "Gadget",
    "Gambling",
    "Game",
    "Game Mechanics",
    "Games",
    "Gamification",
    "Gas",
    "Gay & Lesbian",
    "General Public Worldwide",
    "Generation Y-Z",
    "Genetic Testing",
    "Geospatial",
    "Gift Card",
    "Gift Exchange",
    "Gift Registries",
    "Gold",
    "Golf Equipment",
    "Google Apps",
    "Google Glass",
    "Governance",
    "Government Innovation",
    "Governments",
    "Gps",
    "Graphic Design",
    "Graphics",
    "Green",
    "Green Building",
    "Green Consumer Goods",
    "GreenTech",
    "Groceries",
    "Group Buying",
    "Group Email",
    "Group SMS",
    "Guide to Nightlife",
    "Guides",
    "Handmade",
    "Hardware",
    "Hardware + Software",
    "HDTV",
    "Health and Insurance",
    "Health and Wellness",
    "Health Care",
    "Health Care Information Technology",
    "Health Diagnostics",
    "Health Services Industry",
    "Healthcare Services",
    "Heavy Industry",
    "Hedge Funds",
    "Hi Tech",
    "High School Students",
    "High Schools",
    "High Tech",
    "Hip Hop",
    "Home & Garden",
    "Home Automation",
    "Home Decor",
    "Home Owners",
    "Home Renovation",
    "Homeland Security",
    "Homeless Shelter",
    "Hospitality",
    "Hospitals",
    "Hotels",
    "Human Computer Interaction",
    "Human Resource Automation",
    "Human Resources",
    "Humanitarian",
    "Hunting Industry",
    "IaaS",
    "ICT",
    "Identity",
    "Identity Management",
    "Image Recognition",
    "Impact Investing",
    "Incentives",
    "Incubators",
    "Independent Music",
    "Independent Music Labels",
    "Independent Pharmacies",
    "Indians",
    "Indoor Positioning",
    "Industrial",
    "Industrial Automation",
    "Industrial Energy Efficiency",
    "In-Flight Entertainment",
    "Information Security",
    "Information Services",
    "Information Technology",
    "Infrastructure",
    "Infrastructure Builders",
    "Innovation Engineering",
    "Innovation Management",
    "Insurance",
    "Insurance Companies",
    "Intellectual Asset Management",
    "Intellectual Property",
    "Intelligent Systems",
    "Interest Graph",
    "Interface Design",
    "Interior Design",
    "Internet",
    "Internet Infrastructure",
    "Internet Marketing",
    "Internet of Things",
    "Internet Radio Market",
    "Internet Service Providers",
    "Internet Technology",
    "Internet TV",
    "Investment Management",
    "iOS",
    "iPad",
    "iPhone",
    "iPod Touch",
    "IT and Cybersecurity",
    "IT Management",
    "Jewelry",
    "Journalism",
    "K-12 Education",
    "Kids",
    "Kinect",
    "Knowledge Management",
    "Labor Optimization",
    "Landscaping",
    "Language Learning",
    "Lasers",
    "Law Enforcement",
    "Lead Generation",
    "Lead Management",
    "Legal",
    "Leisure",
    "Licensing",
    "Life Sciences",
    "Lifestyle",
    "Lifestyle Businesses",
    "Lifestyle Products",
    "Lighting",
    "Limousines",
    "Lingerie",
    "Linux",
    "Local",
    "Local Advertising",
    "Local Based Services",
    "Local Businesses",
    "Local Commerce",
    "Local Coupons",
    "Local Search",
    "Local Services",
    "Location Based Services",
    "Logistics",
    "Logistics Company",
    "Lotteries",
    "Low Bid Auctions",
    "Loyalty Programs",
    "M2M",
    "Mac",
    "Machine Learning",
    "Made in Italy",
    "Management",
    "Manufacturing",
    "Maps",
    "Market Research",
    "Marketing Automation",
    "Marketplaces",
    "Mass Customization",
    "Match-Making",
    "Material Science",
    "Mechanical Solutions",
    "Media",
    "Media|Software|Tracking|Web",
    "Medical",
    "Medical Devices",
    "Medical Professionals",
    "Medication Adherence",
    "Meeting Software",
    "Mens Specific",
    "Messaging",
    "mHealth",
    "MicroBlogging",
    "Micro-Enterprises",
    "Minerals",
    "Mining Technologies",
    "MMO Games",
    "Mobile",
    "Mobile Advertising",
    "Mobile Analytics",
    "Mobile Commerce",
    "Mobile Coupons",
    "Mobile Devices",
    "Mobile Emergency&Health",
    "Mobile Enterprise",
    "Mobile Games",
    "Mobile Health",
    "Mobile Infrastructure",
    "Mobile Payments",
    "Mobile Search",
    "Mobile Security",
    "Mobile Shopping",
    "Mobile Social",
    "Mobile Software Tools",
    "Mobile Video",
    "Mobility",
    "Monetization",
    "Moneymaking",
    "Mothers",
    "Motion Capture",
    "Motors",
    "Multi-level Marketing",
    "Music",
    "Music Education",
    "Music Services",
    "Music Venues",
    "Musical Instruments",
    "Musicians",
    "Nanotechnology",
    "Natural Gas Uses",
    "Natural Language Processing",
    "Natural Resources",
    "Navigation",
    "Network Security",
    "Networking",
    "Neuroscience",
    "New Product Development",
    "New Technologies",
    "News",
    "NFC",
    "Nightclubs",
    "Nightlife",
    "Non Profit",
    "Nonprofits",
    "Non-Tech",
    "Nutraceutical",
    "Nutrition",
    "Office Space",
    "Offline Businesses",
    "Oil",
    "Oil & Gas",
    "Oil and Gas",
    "Online Auctions",
    "Online Dating",
    "Online Education",
    "Online Gaming",
    "Online Identity",
    "Online Rental",
    "Online Reservations",
    "Online Scheduling",
    "Online Shopping",
    "Online Travel",
    "Online Video Advertising",
    "Open Source",
    "Operating Systems",
    "Opinions",
    "Optical Communications",
    "Optimization",
    "Organic",
    "Organic Food",
    "Outdoor Advertising",
    "Outdoors",
    "Outsourcing",
    "P2P Money Transfer",
    "PaaS",
    "Parenting",
    "Parking",
    "Payments",
    "PC Gaming",
    "Peer-to-Peer",
    "Performance Marketing",
    "Performing Arts",
    "Personal Branding",
    "Personal Data",
    "Personal Finance",
    "Personal Health",
    "Personalization",
    "Pervasive Computing",
    "Pets",
    "Pharmaceuticals",
    "Photo Editing",
    "Photo Sharing",
    "Photography",
    "Physical Security",
    "Physicians",
    "Plumbers",
    "Podcast",
    "Point of Sale",
    "Politics",
    "Polling",
    "Portals",
    "Postal and Courier Services",
    "Pre Seed",
    "Prediction Markets",
    "Predictive Analytics",
    "Presence",
    "Presentations",
    "Price Comparison",
    "Printing",
    "Privacy",
    "Private Corrections",
    "Private School",
    "Private Social Networking",
    "Procurement",
    "Product Design",
    "Product Development Services",
    "Product Search",
    "Productivity",
    "Productivity Software",
    "Professional Networking",
    "Professional Services",
    "Project Management",
    "Promotional",
    "Property Management",
    "Proximity Internet",
    "Psychology",
    "Public Relations",
    "Public Safety",
    "Public Transportation",
    "Publishing",
    "Q&A",
    "QR Codes",
    "Quantified Self",
    "Quantitative Marketing",
    "Racing",
    "Radical Breakthrough Startups",
    "Rapidly Expanding",
    "Reading Apps",
    "Real Estate",
    "Real Estate Investors",
    "Real Time",
    "Realtors",
    "Recipes",
    "Recreation",
    "Recruiting",
    "Recycling",
    "Registrars",
    "Rehabilitation",
    "Religion",
    "Remediation",
    "Renewable Energies",
    "Renewable Tech",
    "Rental Housing",
    "Reputation",
    "Residential Solar",
    "Resorts",
    "Restaurants",
    "Retail",
    "Retail Technology",
    "Retirement",
    "Reviews and Recommendations",
    "RFID",
    "Ride Sharing",
    "RIM",
    "Risk Management",
    "Robotics",
    "Rural Energy",
    "SaaS",
    "Sailing Community",
    "Sales and Marketing",
    "Sales Automation",
    "Salesforce Killers",
    "Search",
    "Search Marketing",
    "Security",
    "Self Development",
    "Self Storage",
    "Semantic Search",
    "Semantic Web",
    "Semiconductor Manufacturing Equipment",
    "Semiconductors",
    "Senior Citizens",
    "Senior Health",
    "Sensors",
    "SEO",
    "Serious Games",
    "Service Industries",
    "Service Providers",
    "Services",
    "Sex Industry",
    "SexTech",
    "Shared Services",
    "Shipping",
    "Shipping Broker Industry",
    "Shoes",
    "Shopping",
    "Simulation",
    "Skate Wear",
    "Skill Assessment",
    "Skill Gaming",
    "Small and Medium Businesses",
    "Smart Building",
    "Smart Grid",
    "SMS",
    "SNS",
    "Soccer",
    "Social + Mobile + Local",
    "Social Activists",
    "Social Bookmarking",
    "Social Business",
    "Social Buying",
    "Social Commerce",
    "Social CRM",
    "Social Entrepreneurship",
    "Social Fundraising",
    "Social Games",
    "Social Innovation",
    "Social Investing",
    "Social Media",
    "Social Media Advertising",
    "Social Media Agent",
    "Social Media Management",
    "Social Media Marketing",
    "Social Media Monitoring",
    "Social Media Platforms",
    "Social Network Media",
    "Social News",
    "Social Opinion Platform",
    "Social Recruiting",
    "Social Search",
    "Social Television",
    "Social Travel",
    "Software",
    "Software Compliance",
    "Solar",
    "South East Asia",
    "Space Travel",
    "Spam Filtering",
    "Spas",
    "Specialty Chemicals",
    "Specialty Foods",
    "Specialty Retail",
    "Speech Recognition",
    "Sponsorship",
    "Sporting Goods",
    "Sports",
    "Sports Stadiums",
    "Staffing Firms",
    "Startups",
    "Stock Exchanges",
    "Storage",
    "Subscription Businesses",
    "Subscription Service",
    "Sunglasses",
    "Supply Chain Management",
    "Surfing Community",
    "Surveys",
    "Sustainability",
    "Swimming",
    "Synchronization",
    "Systems",
    "Tablets",
    "Task Management",
    "Taxis",
    "Tea",
    "Teachers",
    "Teaching STEM Concepts",
    "Tech Field Support",
    "Technical Continuing Education",
    "Technology",
    "Teenagers",
    "Telecommunications",
    "Telephony",
    "Television",
    "Temporary Staffing",
    "Test and Measurement",
    "Testing",
    "Text Analytics",
    "Textbooks",
    "Textiles",
    "Theatre",
    "Therapeutics",
    "Ticketing",
    "Timeshares",
    "Tourism",
    "Toys",
    "Tracking",
    "Trading",
    "Training",
    "Transaction Processing",
    "Translation",
    "Transportation",
    "Travel",
    "Travel & Tourism",
    "Trusted Networks",
    "Tutoring",
    "TV Production",
    "Twin-Tip Skis",
    "Twitter Applications",
    "Underserved Children",
    "Unifed Communications",
    "Universities",
    "University Students",
    "Unmanned Air Systems",
    "Usability",
    "User Experience Design",
    "User Interface",
    "User Testing",
    "Utilities",
    "Utility Land Vehicles",
    "UV LEDs",
    "Vacation Rentals",
    "Vending and Concessions",
    "Venture Capital",
    "Ventures for Good",
    "Vertical Search",
    "Veterinary",
    "Video",
    "Video Chat",
    "Video Conferencing",
    "Video Editing",
    "Video Game Tournaments",
    "Video Games",
    "Video on Demand",
    "Video Processing",
    "Video Streaming",
    "Virtual Currency",
    "Virtual Desktop",
    "Virtual Goods",
    "Virtual Workforces",
    "Virtual Worlds",
    "Virtualization",
    "Visual Search",
    "Visualization",
    "VoIP",
    "Vulnerability Management",
    "Waste Management",
    "Watch",
    "Water",
    "Water Purification",
    "Wealth Management",
    "Wearables",
    "Web Browsers",
    "Web CMS",
    "Web Design",
    "Web Development",
    "Web Hosting",
    "Web Presence Management",
    "Web Tools",
    "WebOS",
    "Weddings",
    "West Africa",
    "Wholesale",
    "Wind",
    "Windows Phone 7",
    "Wine And Spirits",
    "Wireless",
    "Women",
    "Writers",
    "Young Adults",
  ];
  let selected = [];

  onMount(async () => {
    if (!localStorage.getItem("email")) {
      await goto("/");
    }
    doc = document;
    dateElement = document.getElementById("datepicker");
    steps = Array.from(document.querySelectorAll("form .step"));
    nextBtn = document.querySelectorAll("form .next-btn");
    prevBtn = document.querySelectorAll("form .previous-btn");
    form = document.querySelector("form");

    nextBtn.forEach((button) => {
      button.addEventListener("click", () => {
        changeStep("next");
      });
    });
    prevBtn.forEach((button) => {
      button.addEventListener("click", () => {
        changeStep("prev");
      });
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
      let advertRadioGroup = document.getElementsByName("advert");
      for (let i = 0; i < advertRadioGroup.length; i++) {
        if (advertRadioGroup[i].checked) {
          let groupName = advertRadioGroup[i].name;
          let value = advertRadioGroup[i].value;
          inputs.push({ name: groupName, value: value });
        }
      }

      //topCompany radio group
      let topCompanyRadioGroup = document.getElementsByName("topCompany");
      for (let i = 0; i < topCompanyRadioGroup.length; i++) {
        if (topCompanyRadioGroup[i].checked) {
          let groupName = topCompanyRadioGroup[i].name;
          let value = topCompanyRadioGroup[i].value;
          inputs.push({ name: groupName, value: value });
        }
      }

      //Second round of funding radio group
      let secondRoundRadioGroup = document.getElementsByName("secondRound");
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

      result.email = $user.email;

      console.log(result);

      await fetch("/api/companies", {
        method: "POST",
        body: JSON.stringify(result),
      });

      await fetch(`/api/reports?companyName=${result.companyName}`, {
        method: "POST",
        body: JSON.stringify({
          advert: result.advert,
          age_fund: parseInt(result.firstFundingAge),
          age_mile: parseInt(result.firstMilestoneAge),
          relation_score: parseInt(result.crm),
          signi_event: parseInt(result.milestoneCount),
          second_round: result.secondRound,
          num_employ: parseInt(result.workforce),
          top500: result.topCompany,
        }),
      });

      await form.reset();

      await goto(`/reports/${result.companyName}`);

      while (dateElement.children.length !== 1) {
        dateElement.removeChild(dateElement.lastChild);
      }
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
        inputElement.classList.add(
          "mt-2",
          "bg-kick-gold",
          "text-kick-black",
          "text-lg",
          "font-medium"
        );
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

<div class="bg-kick-black">
  <h1 class="text-white text-center text-3xl font-bold">Analyze</h1>

  <section>
    <div class="container text-white -mt-24">
      <form>
        <div class="step step-1 active bg-kick-gold">
          <div class="form-group bg-kick-gold">
            <label for="companyName" class="bg-kick-gold font-semibold text-xl"
              >Company name</label
            >
            <input
              type="text"
              id="companyName"
              name="companyName"
              class="bg-kick-black"
            />
          </div>

          <!-- Countries option list -->
          <div class="form-group bg-kick-gold">
            <label for="country" class="bg-kick-gold text-xl font-semibold"
              >Country Incorporated in
            </label>
            <select
              class="form-select py-2 w-full bg-kick-black"
              id="country"
              name="country"
            >
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
              <option value="Saint Kitts and Nevis"
                >Saint Kitts and Nevis</option
              >
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
              <option value="Sao Tome and Principe"
                >Sao Tome and Principe</option
              >
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Senegal">Senegal</option>
              <option value="Serbia">Serbia</option>
              <option value="Serbia and Montenegro"
                >Serbia and Montenegro</option
              >
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
            <label
              for="companyCategory"
              class="bg-kick-gold text-xl font-semibold"
              >Company Category
            </label>
            <MultiSelect
              bind:selected
              options={items}
              --sms-options-bg="#1a1a1a"
              --sms-border="none"
              --sms-focus-border="none"
              --sms-width="full"
              --sms-selected-bg="#1a1a1a"
              --sms-remove-btn-hover-color="white"
            />
          </div>

          <button type="button" class="next-btn">Next</button>
        </div>

        <div class="step step-2 bg-kick-gold">
          <div class="form-group bg-kick-gold">
            <label
              for="fundingRounds"
              class="bg-kick-gold text-xl font-semibold"
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
            <label for="fundsRaised" class="bg-kick-gold text-xl font-semibold"
              >Total Funding Amount Raised in USD</label
            >
            <input type="text" id="fundsRaised" name="fundsRaised" />
          </div>

          <div class="input-group date form-group bg-kick-gold" id="datepicker">
            <label for="fundsRaised" class="bg-kick-gold text-xl font-semibold"
              >Enter the dates from the first - latest funding rounds</label
            >
          </div>

          <button type="button" class="previous-btn">Prev</button>
          <button type="button" class="next-btn">Next</button>

          <!-- <button type="submit" class="submit-btn">Submit</button> -->
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
                value="Yes"
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
                value="No"
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
            <input
              type="text"
              id="firstMilestoneAge"
              name="firstMilestoneAge"
            />
          </div>

          <div class="form-group bg-kick-gold">
            <label
              for="milestoneCount"
              class="bg-kick-gold text-xl font-semibold"
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
                value="Yes"
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
                value="No"
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
                value="Yes"
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
                value="No"
              />
            </div>
          </div>

          <button type="button" class="previous-btn">Prev</button>
          <!-- <button type="button" class="next-btn">Next</button> -->

          <button type="submit" class="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  </section>
</div>

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
