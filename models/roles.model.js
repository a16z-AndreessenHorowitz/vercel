const mongoose = require('mongoose')

const rolesSchema = new mongoose.Schema({
    title: String,
    description:String,
    permissons:{
      type:Array,
      default:[]
    },
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

const Role = mongoose.model('Role', rolesSchema ,'roles');

module.exports = Role