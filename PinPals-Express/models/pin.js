const mongoose = require('mongoose')

const pinSchema = mongoose.Schema({
    name: {type: String, required: true},
    coordinates: {type: Number, required: true},
    description: String,
    date: {type: Date, default: Date.now},
    tags: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Pin', pinSchema)