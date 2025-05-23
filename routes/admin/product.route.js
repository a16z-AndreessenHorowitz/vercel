const express = require("express")
const multer = require('multer')

const route = express.Router()
// const storageMulter= require("../../helpers/storageMulter.js")
// const upload = multer({ storage: storageMulter() }) //() gọi hàm


const upload = multer()


const controller = require("../../controllers/admin/product.controller")
const validate = require("../../validates/admin/product.validate.js")

//upload cloud
const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware.js")

route.get("/", controller.index)

route.patch("/change-status/:status/:id", controller.changeStatus)

route.patch("/change-multi", controller.changeMulti)

route.delete("/delete/:id", controller.deleteItem)

route.get("/create", controller.create)

//Khác nhau bởi phương thức
route.post("/create",
  upload.single('thumbnail'),
  uploadCloud.upload,
  //middle ware
  validate.creatPost,
  controller.createPost) //Trường

//giao diện thui
route.get('/edit/:id', controller.edit)
//patch 
route.patch('/edit/:id',
  upload.single('thumbnail'),
  uploadCloud.upload,
  //middle ware
  validate.creatPost,
  controller.editPatch)

route.get('/detail/:id', controller.detail)


module.exports = route

