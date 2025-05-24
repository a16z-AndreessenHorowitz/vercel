const Account=require("../../models/account.model.js")
var md5 = require('md5');
const systemConfig=require("../../config/system")


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
  if(md5(password) != user.password){
    req.flash("error","Mật khẩu không chính xác")
    res.redirect("back")
    return
  }
  if(user.status == "inactive"){
    req.flash("error","Tài khoản đã bị khoá")
    res.redirect("back")
    return
  }
  res.cookie("token",user.token)
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`)

}

// [GET] /admin/auth/logout
module.exports.logout=async (req, res)=>{
  //Xoá token trong cookie
  res.clearCookie("token")
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}
