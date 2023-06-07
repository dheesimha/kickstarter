import Company from "../../../lib/models/companyDetails"
import User from "$lib/models/user"

export const POST = async (event) => {
    let result = await event.request.json()

    const pattern = /Date/
    let datesArray = [];
    let averageDuration;

    Object.keys(result).forEach(key => {
        if (pattern.test(key)) {
            datesArray.push(result[key])
        }
    })

    let email = await result.email;

    let userDetails = await User.findOne({ email }).exec()

    const durations = [];
    if (datesArray.length > 1) {
        for (let i = 0; i < datesArray.length - 1; i++) {
            const currentDate = new Date(datesArray[i]);
            const nextDate = new Date(datesArray[i + 1]);
            const duration = (nextDate - currentDate) / (1000 * 60 * 60 * 24); // Difference in days
            durations.push(duration);
        }

        // Calculate the average funding duration
        averageDuration = durations.reduce((acc, curr) => acc + curr, 0) / durations.length;
    }
    else {
        averageDuration = 0;
    }
    console.log(averageDuration);

    let item = {
        user: userDetails._id,
        companyName: result.companyName,
        companyCategory: result.companyCategory,
        country: result.country,
        fundingRounds: result.fundingRounds,
        totalFundingAmount: result.fundsRaised,
        datesArray: datesArray,
        advert: result.advert,
        topCompany: result.topCompany,
        secondRound: result.secondRound,
        crm: result.crm,
        workforce: result.workforce,
        firstFundingAge: result.firstFundingAge,
        firstMilestoneAge: result.firstMilestoneAge,
        milestoneCount: result.milestoneCount,
        funding_duration_avg: averageDuration
    }

    let createdCompany = await Company.create(item)
    if (createdCompany) {
        console.log('Created a new company record')
        return new Response(JSON.stringify(createdCompany), {
            status: 201
        })
    }
    else {
        console.log('Failed to create a new company record')
        return new Response(JSON.stringify({
            message: 'Failed to create a new company record'
        }, {
            status: 400
        }))
    }


}


export const GET = async (event) => {
    let email = await event.url.searchParams.get('email')
    let person = await User.findOne({ email: email })
    let companies = await Company.find({ user: person._id }).exec();

    if (companies.length > 0) {
        console.log('Companies found')
        return new Response(JSON.stringify(companies), {
            status: 200,
        })
    }

    else {
        return new Response(JSON.stringify({
            message: 'You have not analyzed any company'
        }), {
            status: 202
        })
    }


}
