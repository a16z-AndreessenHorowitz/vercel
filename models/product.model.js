const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)

const productSchema = new mongoose.Schema({
    title: String,
    product_category_id:{
        type: String,
        default:"",
    },
    description:String,
    category: String,
    price: Number,
    discountPercentage:Number,
    status: String,
    stock: Number,
    thumbnail: String,

    slug: { type: String,
        slug: "title",
        unique: true
    },
    createdBy:{
        account_id:String,
        createdAt:{
            type:Date,
            default:Date.now
        }
    },
    deleted:{
        type:Boolean,
        default:false
    },
    deletedBy:{
        account_id:String,
        deletedAt:Date 
    },
    position:Number,
    //deletedAt: Date
},{
    timestamps:true//truyền true thay đọan code phía dưới
    // timestamps: {
    //     createdAt: 'created_at', // Use `created_at` to store the created date
    //     updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    //   }
});

const Product = mongoose.model('Product', productSchema,'products');

module.exports = Product;