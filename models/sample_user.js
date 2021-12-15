const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Please provide name.'],
        trim: true,
    },
    age: {
        type: Number,
        require: [true, 'Please provide age.'],
    },
    hobby: {
        type: String,
    },
    surgeon: {
        type: Boolean,
        default: false
    },
    dateAdded: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema)