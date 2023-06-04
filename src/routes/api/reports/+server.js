import Company from "../../../lib/models/companyDetails"

export const POST = async (event) => {
    let body = await event.request.json()
    let companyName = await event.url.searchParams.get('companyName')
    let finalResponse

    try {

        let response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "mode": "cors"
            }
        })

        let result = await response.json()
        console.log(result)

        if (result.success == 0) {
            finalResponse = await Company.findOneAndUpdate({ companyName: companyName }, { success: 1 })
            console.log('Entered success')
            console.log(finalResponse)
        }
        else {
            finalResponse = await Company.findOneAndUpdate({ companyName: companyName }, { success: 0 })
            console.log('Entered failure')
            console.log(finalResponse)


        }

        return new Response(JSON.stringify(finalResponse), {
            status: 200
        })
    }

    catch (err) {
        console.log(err);
    }

}
