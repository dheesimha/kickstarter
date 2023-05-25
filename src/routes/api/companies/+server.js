import Company from "../../../lib/models/companyDetails"
import User from "$lib/models/user"

export const POST = async (event) => {
    let result = await event.request.json()

    const pattern = /Date/
    let datesArray = [];

    Object.keys(result).forEach(key => {
        if (pattern.test(key)) {
            datesArray.push(result[key])
        }
    })

    let email = await result.email;

    let userDetails = await User.findOne({ email }).exec()

    let item = {
        user: userDetails._id,
        companyName: result.companyName,
        companyCategory: result.companyCategory,
        country: result.country,
        fundingRounds: result.fundingRounds,
        totalFundingAmount: result.fundsRaised,
        fundingDates: datesArray
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
