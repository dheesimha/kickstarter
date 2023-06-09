import Company from "../../../../lib/models/companyDetails"
import User from "$lib/models/user"

export const GET = async (event) => {
    let companyName = event.url.searchParams.get('companyName')
    let email = event.url.searchParams.get('email')
    let person = await User.findOne({ email }).exec()
    let companyDetails = await Company.findOne({ companyName, user: person._id })

    if (companyDetails) {
        console.log('Returned company detatils of' + companyName)
        return new Response(JSON.stringify(companyDetails), {
            status: 200,
        })
    }

    else {
        console.log('Company not found')

        return new Response({ message: 'Company not found' }, {
            status: 404
        })
    }


}


export const PUT = async (event) => {

    let result = await event.request.json()

    const pattern = /Date/
    let datesArray = [];
    let averageDuration;


    Object.keys(result).forEach(key => {
        if (pattern.test(key)) {
            datesArray.push(result[key])
        }
    })


    if (datesArray.length > 1) {
        const firstDate = new Date(datesArray[0])
        const lastDate = new Date(datesArray[datesArray.length - 1])

        averageDuration = (lastDate - firstDate) / (1000 * 60 * 60 * 24); // Difference in days
    }

    else {
        averageDuration = 0;
    }

    let item = {
        user: result.userId,
        companyName: result.companyName,
        companyCategory: result.companyCategory,
        country: result.country,
        fundingRounds: result.fundingRounds,
        totalFundingAmount: result.fundsRaised,
        fundingDates: datesArray,
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


    let replacedCompany = await Company.findOneAndUpdate({ _id: result.resourceId }, item, {
        new: true
    })

    if (replacedCompany) {
        console.log('Updated the record')
        return new Response(JSON.stringify(replacedCompany), {
            status: 201
        })
    }

    else {
        console.log('Error updating the record')
        return new Response(JSON.stringify({
            message: 'Error updating the record'
        }), {
            status: 400
        })
    }


}



export const DELETE = async (event) => {

    let result = await event.request.json();

    let response = await Company.deleteOne({ _id: result.id })

    if (response) {
        console.log('Deleted ' + result.companyName)
        return new Response(JSON.stringify(response), {
            status: 200
        })
    }
    else {
        console.log('Failed to delete ' + result.companyName)
        return new Response(JSON.stringify({
            message: 'Failed to delete ' + result.companyName
        }), {
            status: 400
        })
    }


}
