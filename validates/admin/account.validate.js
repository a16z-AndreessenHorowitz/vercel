module.exports.creatPost=(req,res,next)=>{
  if(!req.body.fullName){
		req.flash("error","Vui lòng nhập tên")
		res.redirect("back")
		return; //Ngăn chặn dòng code phía dưới
	}
  if(!req.body.email){
		req.flash("error","Vui lòng nhập email")
		res.redirect("back")
		return; //Ngăn chặn dòng code phía dưới
	}
  if(!req.body.password){
		req.flash("error","Vui lòng nhập password")
		res.redirect("back")
		return; //Ngăn chặn dòng code phía dưới
	}
  next()
}