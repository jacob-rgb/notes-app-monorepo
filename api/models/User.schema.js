const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    notes: [{
        type:  Schema.Types.ObjectId,
        ref: 'Note',
        default: []
    }]
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;

        delete returnedObject.password
    }
});

const User = model('User', userSchema);

module.exports = User;