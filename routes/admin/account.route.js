const express=require("express")
const route=express.Router()

const multer = require('multer')
const upload = multer()

const controller=require("../../controllers/admin/account.controller")
const validate=require("../../validates/admin/account.validate")
const uploadCloud=require("../../middlewares/admin/uploadCloud.middleware.js")


route.get("/",controller.index)

route.get("/create",controller.create)

route.post("/create",
  upload.single('avatar'),
  uploadCloud.upload,
  validate.creatPost,
  controller.createPost
)


module.exports=route