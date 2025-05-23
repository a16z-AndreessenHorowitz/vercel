const mongoose = require('mongoose')
const generate=require("../helpers/generate.js")
const accountSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    token:{
        type:String,
        default:generate.generateRandomString(20)
    },
    phone:String,
    avatar:String,
    role_id:String,
    status:String,
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt: Date
},{
    timestamps:true//truyền true thay đọan code phía dưới
    // timestamps: {
    //     createdAt: 'created_at', // Use `created_at` to store the created date
    //     updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    //   }
});

const Account = mongoose.model('Account', accountSchema,'accounts');

module.exports = Account;