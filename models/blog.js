const mongoose = require('mongoose');


const BlogSchmema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    body:{
        type:String,
        required:true,
        min:6,
        max:3000
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Blog",BlogSchmema);