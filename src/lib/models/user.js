import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id, delete returnedObject.__v
    }
})

const User = new mongoose.model("User", userSchema);

export default User;
