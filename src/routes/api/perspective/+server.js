import Company from "../../../lib/models/companyDetails"
import User from "$lib/models/user"


export const POST = async (event) => {
    let body = await event.request.json()
    let companyName = await event.url.searchParams.get('companyName')
    let email = await event.url.searchParams.get('email')
    let finalResponse

    let dev = 1

    let url;

    if (dev) {
        url = "https://kickstarter5.onrender.com/predict"
    }
    else {
        url = "https://kickstarter-old-pers-model-production.up.railway.app/predict"
    }

    try {

        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "mode": "cors"
            }
        })

        let result = await response.json()
        console.log(result)

        let person = await User.findOne({ email }).exec()


        if (result.success == 0) {
            finalResponse = await Company.findOneAndUpdate({ companyName: companyName, user: person._id }, { perspectiveSuccess: 1 })
            console.log('Entered perspective success')
            console.log(finalResponse)
        }
        else {
            finalResponse = await Company.findOneAndUpdate({ companyName: companyName, user: person._id }, { perspectiveSuccess: 0 })
            console.log('Entered perspective failure')
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
