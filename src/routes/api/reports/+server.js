import Company from "../../../lib/models/companyDetails"
import User from "$lib/models/user"

import * as countries from "i18n-iso-countries"

export const POST = async (event) => {
    let body = await event.request.json()
    let companyName = await event.url.searchParams.get('companyName')
    let email = await event.url.searchParams.get('email')
    let person = await User.findOne({ email: email })
    let finalResponse

    body.category = body.category.join('|')
    body.country_code = countries.getAlpha3Code(body.country_code, "en")

    let dev = 1;

    let url;
    if (dev) {
        url = "https://kickstarter-fin-model.onrender.com"
    }
    else {
        url = "https://kickstarter-fin-model-production.up.railway.app"
    }

    console.log(body)

    try {
        console.log('Hitting Remote Endpoint')

        let response = await fetch(`${url}/predict`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "mode": "cors"
            }
        })

        let result = await response.json()
        console.log(result)

        console.log('Getting avg result')
        let response2 = await fetch(`${url}/dataAvg`, {
            method: "POST",
            body: JSON.stringify({
                country_code: body.country_code
            }),
            headers: {
                "Content-Type": "application/json",
                "mode": "cors"
            }
        })

        let res2 = await response2.json()
        console.log(res2)

        if (result.success == 1) {
            finalResponse = await Company.findOneAndUpdate({ companyName: companyName, user: person._id },
                {
                    financialSuccess: 1,
                    funding_total_average: res2.funding_total_average,
                    country_funding_duration_avg: res2.funding_duration_avg,
                    funding_rounds_avg: res2.funding_rounds_avg,
                    reportGenerated: true
                })
            console.log('Entered financial success')
        }
        else {
            finalResponse = await Company.findOneAndUpdate({ companyName: companyName, user: person._id }, {
                financialSuccess: 0,
                funding_total_average: res2.funding_total_average,
                country_funding_duration_avg: res2.funding_duration_avg,
                funding_rounds_avg: res2.funding_rounds_avg,
                reportGenerated: true
            })
            console.log('Entered financial failure')

        }

        return new Response(JSON.stringify(finalResponse), {
            status: 201
        })
    }

    catch (err) {
        console.log(err)
        return new Response(JSON.stringify({ Error: err.message }), { status: 400 })
    }

}



export const GET = async (event) => {
    let email = await event.url.searchParams.get('email')
    let person = await User.findOne({ email: email })
    let companies = await Company.find({ user: person._id, reportGenerated: true }).exec();

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



