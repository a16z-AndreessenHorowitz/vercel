
const Product=require("../../models/product.model")
const ProductCateGory=require("../../models/product-category.model")

const systemConfig=require("../../config/system")

const filterStatusHeper=require("../../helpers/filterStatus")
const searchHeper=require("../../helpers/search.js")
const paginationHelper=require("../../helpers/pagiantion.js")
const createTreeHelper=require("../../helpers/createTree.js")


// [GET] /admin/products
module.exports.index= async(req, res)=>{
      //Đoạn này bộ lọc
		const filterStatus=filterStatusHeper(req.query)
    
		//Models
    let find={
        deleted:false,
		
    };

    if(req.query.status){
      find.status=req.query.status
    }

	//Đoạn này tìm kiếm
    const objectSearch=searchHeper(req.query)
	

	if(objectSearch.regax){
        find.title=objectSearch.regax;
	}
	//Paganation
	const countProducts=await Product.countDocuments(find);

	let objectPagiantion=paginationHelper({
		currentPage:1,
		limitItems:4
	}, req.query,countProducts)
	
	//Pagination

//Sort
let sort={}
if(req.query.sortKey && req.query.sortValue){
	sort[req.query.sortKey]=req.query.sortValue
}
else{
sort.position="desc"
}

//End sort


	//Models
    const products = await Product.find(find).sort(sort).limit(objectPagiantion.limitItems).skip(objectPagiantion.skip)

   

    res.render("admin/pages/products/index",{
        pageTitle:"Danh sách sản phẩm",
        products:products,
		filterStatus: filterStatus,
		keyword:objectSearch.keyword,
		pagination:objectPagiantion
    })
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus= async(req,res)=>{
	const status=req.params.status
	const id =req.params.id
	await Product.updateOne({ _id: id },{ status:status })   //update one thing

	req.flash('info','Đã cập nhật trạng thái')
	res.redirect("back") //chuyển hướng //back chuyển hướng đúng tại trang đó
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti= async(req,res)=>{
	// console.log(req.body)

	const type=req.body.type;
	const ids=req.body.ids.split(", ");//convert lại 1 mảng

	switch(type){
		case "active":
			await Product.updateMany({ _id : { $in: ids }},{status:"active"})
			req.flash('info',`Cập nhật trạng thái thành ${ids.length} sản phẩm!`)
			break;
		case "inactive":
			await Product.updateMany({ _id : { $in: ids }},{status:"inactive"})
			req.flash('info',`Cập nhật trạng thái thành ${ids.length} sản phẩm!`)
			break;
		case "delete-all":
			await Product.updateMany({ _id : { $in: ids }},{deleted:true, deletedAt: new Date() })
			//deletemany xoá nhiều, chúng ta xoá mềm thui
			req.flash('info',`Đã xoá thành công ${ids.length} sản phẩm!`)
			break;
		case "change-position":
			for(const item of ids){
				// destructuring assignment (phân rã) trong JavaScript	
				let [id, position]=item.split("-");
				position=parseInt(position)
				await Product.updateOne({_id:id},{ position: position})// update từng sản phẩm vì có nhiều vị trí khác nhau\
			}
			req.flash('info',`Đã cập nhật position thành công ${ids.length} sản phẩm!`)
			//Để nó hiện ra theo đúng vậy trí, quay lại phần [GET] /admin/products vì nó là nơi in ra giao diện
			
		default:
			break;

	}
	res.redirect("back")
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem= async(req,res)=>{
	const id =req.params.id
//Xoá cứng, xoá vĩnh viễn
	//await Product.deleteOne({ _id: id })   //update one thing
//Xoá mềm để trường delected=true
	await Product.updateOne({ _id: id },{ deleted: true , deletedAt: new Date() });

	req.flash('info',`Đã xoá thành công sản phẩm!`)
// Chuyển hướng về trang trước đó hoặc trang chủ nếu không có Referrer
res.redirect(req.get("Referrer") || "/");
}


// [GET] /admin/products/create
module.exports.create=async (req,res)=>{
let find={
	deleted:false,
}
const category=await ProductCateGory.find(find)

const newCategory=createTreeHelper.tree(category)


res.render("admin/pages/products/create",{
	pageTitle:"Thêm sản phẩm mới",
	category: newCategory
})
}


// [POST] /admin/products/create
module.exports.createPost=async (req,res)=>{


	// console.log(req.body)
	 // Chuyển đổi dữ liệu về đúng kiểu
	 req.body.price = parseInt(req.body.price)
	 req.body.discountPercentage = parseInt(req.body.discountPercentage);
	 req.body.stock =parseInt(req.body.stock);


	 if(req.body.position==""){
		const countProducts=await Product.countDocuments({}) 
		req.body.position=countProducts+1;
	 }
	 else{
		req.bod.position=parseInt(req.body.position)
	 }
	//  if(req.file){
	// 	req.body.thumbnail=`/uploads/${req.file.filename}`//express đi vào luôn thư mục public nên không dùng req.path được
	// 	}
		// chuyển code qua routes r
	 

	const product=new Product(req.body)
	await product.save()
	//flash
	req.flash('info',`Đã thêm sản phẩm thành công!`)
	res.redirect('/admin/products')
}

// [GET] /admin/products/edit/:id
module.exports.edit=async (req,res)=>{

	// console.log(req.params.id)
	try {
		const find={
			deleted:false,
			_id:req.params.id
		}
		const product=await Product.findOne(find)

		const category=await ProductCateGory.find({
			deleted:false,
		})
		
		const newCategory=createTreeHelper.tree(category)

	//Chỉ trả ra 1 bản nên dùng find
		res.render("admin/pages/products/edit.pug",{
			pageTitle:"Chỉnh sửa phẩm mới",
			product: product,
			category:newCategory
		})
	} catch (error) {
		res.redirect(`${systemConfig.prefixAdmin}/products`)
	}

	}

	// [PATCH] /admin/products/edit/:id
module.exports.editPatch=async (req,res)=>{
	 // Chuyển đổi dữ liệu về đúng kiểu
	 req.body.price = parseInt(req.body.price)
	 req.body.discountPercentage = parseInt(req.body.discountPercentage);
	 req.body.stock =parseInt(req.body.stock);
	 req.body.position=parseInt(req.body.position)
	 
		try {
			await Product.updateOne({_id: req.params.id} , req.body)
			req.flash('info',`Cập nhật sản phẩm thành công!`)
		} catch (error) {
			req.flash('error',`Cập nhật sản phẩm không thành công!`)
		}
	//flash
	res.redirect('back')
}

// [GET] /admin/products/detail/:id
module.exports.detail=async (req,res)=>{

	// console.log(req.params.id)
	try {
		const find={
			deleted:false,
			_id:req.params.id
		}
		const product=await Product.findOne(find)
	//Chỉ trả ra 1 bản nên dùng find
		res.render("admin/pages/products/detail",{
			pageTitle:product.title,
			product: product
		})
	} catch (error) {
		res.redirect(`${systemConfig.prefixAdmin}/products`)
	}

	}