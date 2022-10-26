const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    budget: {
        type: String,
       
    },
    project_brief: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
}, { timestamps: true })



module.exports = Data = mongoose.model('Data',DataSchema)