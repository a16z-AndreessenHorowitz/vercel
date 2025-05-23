const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const productCateGorySchema = new mongoose.Schema({
    title: String,
    parent_id:{
      type: String,
      default:"",
    },
    description:String,
    status: String,
    thumbnail: String,
    slug: { type: String,
        slug: "title",
        unique: true
    },
    deleted:{
        type:Boolean,
        default:false
    },
    position:Number,
    deletedAt: Date
},{
    timestamps:true//truyền true thay đọan code phía dưới
    // timestamps: {
    //     createdAt: 'created_at', // Use `created_at` to store the created date
    //     updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    //   }
});

const ProductCateGory = mongoose.model('ProductCateGory', productCateGorySchema,'products-category');

module.exports = ProductCateGory;