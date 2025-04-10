const Product=require("../../models/product.model")
const systemCongfig=require("../../config/system")
// [GET] /products
module.exports.index= async (req,res)=>{
    const products = await Product.find({
        status:"active",
        deleted:false,
    }).sort({position: "desc"});
    
    products.forEach(item=>{
        item.priceNew=(item.price*(100-item.discountPercentage)/100).toFixed(0);
        //hàm foreach không cần return 
    })



    res.render("client/pages/products/index.pug",{
        pageTitle:"Trang danh sách sản phẩm",
        products: products
    })
}

// [GET] /products/:slug
module.exports.detail= async(req, res)=>{
  try {
    const find={
        deleted:false,
        slug:req.params.slug,
        status: "active",
    }
    const product=await Product.findOne(find)

    res.render("client/pages/products/detail",{
        pageTitle:"Chi tiết sản phẩm",
        product: product,
    })
  } catch (error) {
    res.redirect(`${systemCongfig.prefixAdmin}/products`)
  }
}