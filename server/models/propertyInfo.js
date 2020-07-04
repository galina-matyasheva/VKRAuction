const mongoose = require('mongoose')
const Schema = mongoose.Schema

const propertyInfo = new Schema(
    {
        uid:  { type: String, required: false },
        title: { type: String, required: true },
        details: { type: String, required: true },
        price: { type: Number, required: true },
        photoIds: {type: [String], required: false}
    },
    { timestamps: true },
)

module.exports = mongoose.model('propertyInfo', propertyInfo)
