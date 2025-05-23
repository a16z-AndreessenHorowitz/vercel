const ProductCateGory=require("../../models/product-category.model")
const systemConfig=require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHeper=require("../../helpers/search.js");
const createTreeHelper=require("../../helpers/createTree.js")


// [GET] /admin/products-category
module.exports.index= async(req, res)=>{

  const filterStatus=filterStatusHelper(req.query)

  

  let find={
    deleted:false,
  };


  if(req.query.status){
    find.status=req.query.status
  }

  let sort={}
  if(req.query.sortKey && req.query.sortValue){
    sort[req.query.sortKey]=req.query.sortValue
  }else{
    sort.position="desc"
  }

  //Đoạn này tìm kiếm
    const objectSearch=searchHeper(req.query)
    if(objectSearch.regax){
          find.title=objectSearch.regax;
    }

  const records = await ProductCateGory.find(find).sort(sort)

  const newRecords=createTreeHelper.tree(records)

  res.render("admin/pages/products-category/index",{
      pageTitle:"Trang danh mục sản phẩm",
      records:newRecords,
      filterStatus: filterStatus,
      keyword:objectSearch.keyword,
  })
}

// [PATCH] /admin/products/delete/:id
module.exports.deleteItem= async(req,res)=>{
  const id=req.params.id
  await ProductCateGory.updateOne({_id: id},{deleted:true, deletedAt:new Date()});

  req.flash("info","Đã xoá sản phẩm thành công!")
	res.redirect("back") //chuyển hướng //back chuyển hướng đúng tại trang đó
}


// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus= async(req,res)=>{
	const status=req.params.status
	const id =req.params.id
	await ProductCateGory.updateOne({ _id: id },{ status:status })   //update one thing

	res.redirect("back") //chuyển hướng //back chuyển hướng đúng tại trang đó
}

// [GET] /admin/product-category/create
module.exports.create=async (req, res)=>{
  let find={
    deleted:false,

  }


  const records=await ProductCateGory.find(find)

  const newRecords=createTreeHelper.tree(records)



  res.render("admin/pages/products-category/create",{
      pageTitle:"Tạo danh mục sản phẩm",
      records:newRecords
  })
}


// [PATCH] /admin/products/change-multi
module.exports.changeMulti= async(req,res)=>{
  // console.log(req.body)

  const type=req.body.type;
  const ids=req.body.ids.split(", ");//convert lại 1 mảng

  switch(type){
    case "active":
      await ProductCateGory.updateMany({ _id : { $in: ids }},{status:"active"})
      req.flash('info',`Cập nhật trạng thái thành ${ids.length} sản phẩm!`)
      break;
    case "inactive":
      await ProductCateGory.updateMany({ _id : { $in: ids }},{status:"inactive"})
      req.flash('info',`Cập nhật trạng thái thành ${ids.length} sản phẩm!`)
      break;
    case "delete-all":
      await ProductCateGory.updateMany({ _id : { $in: ids }},{deleted:true, deletedAt: new Date() })
      //deletemany xoá nhiều, chúng ta xoá mềm thui
      req.flash('info',`Đã xoá thành công ${ids.length} sản phẩm!`)
      break;
    case "change-position":
      for(const item of ids){
        // destructuring assignment (phân rã) trong JavaScript	
        let [id, position]=item.split("-");
        position=parseInt(position)
        await ProductCateGory.updateOne({_id:id},{ position: position})// update từng sản phẩm vì có nhiều vị trí khác nhau\
      }
      req.flash('info',`Đã cập nhật position thành công ${ids.length} sản phẩm!`)
      //Để nó hiện ra theo đúng vậy trí, quay lại phần [GET] /admin/products vì nó là nơi in ra giao diện
      
    default:
      break;

  }
  res.redirect("back")
}




// [POST] /admin/products/create
module.exports.createPost=async (req,res)=>{

  if(req.body.position==""){
		const countProducts=await ProductCateGory.countDocuments({}) 
		req.body.position=countProducts+1;
	 }
	 else{
		req.bod.position=parseInt(req.body.position)
	 }

   const record=await ProductCateGory(req.body)
   await record.save()

   res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}


module.exports.detail=async(req, res)=>{
  try{
    const find={
      deleted:false,
      _id: req.params.id
    }
    const records=await ProductCateGory.findOne(find)

    res.render(`admin/pages/products-category/detail`,{
      pageTitle: records.title,
      records: records
    })
  }catch(error){
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  }
}
// [GET] /admin/products/edit/:id
module.exports.edit=async (req,res)=>{
  try {
    const id=req.params.id
    const records=await ProductCateGory.findOne({
      _id:id,
      deleted:false
      })
    const danhmuc=await ProductCateGory.find({deleted:false})
    const newDanhmuc=createTreeHelper.tree(danhmuc)
    // const newRecords=createTreeHelper.tree(records)
    // console.log(newRecords)
    // const newRecords=createTreeHelper.tree(records)
  //Chỉ trả ra 1 bản nên dùng find
    res.render("admin/pages/products-category/edit.pug",{
      pageTitle:"Chỉnh sửa phẩm mới",
      records: records,
      danhmuc: newDanhmuc,
    })
    } catch (error) {
      res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
  }

// [PATCH] /admin/products/edit/:id
module.exports.editPatch= async (req,res)=>{

  if(req.body.position){
    parseInt(req.body.position)
  }
  try {
    await ProductCateGory.updateOne({_id:req.params.id},req.body)
    req.flash("info","Cập nhật danh mục thành công!")
  } catch (error) {
    req.flash("erorr","Cập nhật danh mục không thành công!")
  }

  res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}