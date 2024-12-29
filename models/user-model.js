const { type } = require('express/lib/response');
const mongoose = require('mongoose');

//mongoose.connect("mongodb://127.0.0.1:27012/scatch");

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
   
    orders:{
        type: Array,
        default:[]
    },
    contact: Number,
    picture: String
});

module.exports = mongoose.model("user", userSchema);