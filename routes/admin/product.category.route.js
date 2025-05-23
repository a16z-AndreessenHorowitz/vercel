const express=require("express")
const route=express.Router()
const multer = require('multer')


const upload = multer()

const controller=require("../../controllers/admin/product-category.controller")
const validate = require("../../validates/admin/products-category.validate.js")
const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware.js")


route.get("/",controller.index)

route.get("/create",controller.create)

route.patch("/change-status/:status/:id",controller.changeStatus)

route.delete("/delete/:id",controller.deleteItem)

route.patch("/change-multi",controller.changeMulti)
//Khác nhau bởi phương thức
route.post("/create",
  upload.single('thumbnail'),
  uploadCloud.upload,
  //middle ware
  validate.creatPost,
  controller.createPost
)

route.get("/edit/:id",controller.edit)

route.patch("/edit/:id",
  upload.single('thumbnail'),
  uploadCloud.upload,
  controller.editPatch
)

route.get("/detail/:id",controller.detail)
module.exports=route