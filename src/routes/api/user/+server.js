import User from "../../../lib/models/user"

export const POST = async (event) => {

    let body = await event.request.json()
    let email = await body.email;
    let name = await body.name;
    let user = await User.findOne({ email })

    if (!user) {
        let createdUser = await User.create({ email: email, name: name })
        if (createdUser) {
            console.log("Created user: " + createdUser)
            return new Response(JSON.stringify(createdUser), {
                status: 201
            })
        }
    }
    else {
        console.log("User already exists")
        return new Response(JSON.stringify({
            message: 'User already exists'
        }), {
            status: 200
        })
    }
}
