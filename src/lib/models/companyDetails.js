import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    companyName: String,
    country: String,
    companyCategory: String,
    fundingRounds: String,
    totalFundingAmount: String,
    fundingDates: [String]
})

companySchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Company = new mongoose.model("Company", companySchema);

export default Company;
