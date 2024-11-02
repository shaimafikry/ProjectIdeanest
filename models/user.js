const mongoose = require('mongoose');
const validator = require('validator');

const UsersSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'This field must be a valid email']
    },
    password: {
        type: String,
        required: true
    }
});


const Users =  mongoose.model('Users', UsersSchema);
module.exports = Users;
