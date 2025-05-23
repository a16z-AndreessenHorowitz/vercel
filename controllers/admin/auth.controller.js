const Account=require("../../models/account.model.js")
var md5 = require('md5');

// [GET] /admin/auth
module.exports.login=async (req, res)=>{
res.render("admin/pages/auth/login",{
  pageTitle:"Trang đăng nhập"
})
}
// [POST] /admin/auth
module.exports.loginPost=async (req, res)=>{
  const {email,password}= req.body
  const user=await Account.findOne({
    email:email,
    deleted:false
  })
  if(!user){
    req.flash("error","Email không tồn tại!")
    res.redirect("back")
    return;// khỏi chạy đoạn code dưới
  }
res.send("ok") 148

}
