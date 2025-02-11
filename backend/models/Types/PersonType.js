const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    patternLastName: {
        type: String,
        required: true
    },
    matternLastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Person', personSchema);