import Company from "../../../lib/models/companyDetails"
import * as countries from "i18n-iso-countries"

export const POST = async (event) => {
    let body = await event.request.json()
    let companyName = await event.url.searchParams.get('companyName')
    let finalResponse

    body.category = body.category.join('|')
    body.country_code = countries.getAlpha3Code(body.country_code, "en")


    console.log(body)

    try {
        console.log('Hitting Remote Endpoint')

        let response = await fetch("https://kickstarter-fin-model.onrender.com/predict", {
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
        let response2 = await fetch("https://kickstarter-fin-model.onrender.com/dataAvg", {
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
            finalResponse = await Company.findOneAndUpdate({ companyName: companyName },
                {
                    success: 1,
                    funding_total_average: res2.funding_total_average,
                    country_funding_duration_avg: res2.funding_duration_avg,
                    funding_rounds_avg: res2.funding_rounds_avg
                })
            console.log('Entered success')
        }
        else {
            finalResponse = await Company.findOneAndUpdate({ companyName: companyName }, {
                success: 0,
                funding_total_average: res2.funding_total_average,
                country_funding_duration_avg: res2.funding_duration_avg,
                funding_rounds_avg: res2.funding_rounds_avg
            })
            console.log('Entered failure')

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
