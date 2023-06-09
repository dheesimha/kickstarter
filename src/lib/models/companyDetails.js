import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    companyName: String,
    country: String,
    companyCategory: [String],
    fundingRounds: String,
    totalFundingAmount: String,
    fundingDates: [String],
    advert: String,
    topCompany: String,
    secondRound: String,
    crm: String,
    workforce: String,
    firstFundingAge: String,
    firstMilestoneAge: String,
    milestoneCount: String,
    financialSuccess: Number,
    perspectiveSuccess: Number,
    funding_total_average: Number,
    country_funding_duration_avg: Number,
    funding_rounds_avg: Number,
    funding_duration_avg: Number,
    reportGenerated: {
        type: Boolean,
        default: false
    }
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

