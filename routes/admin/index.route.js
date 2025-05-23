const dashboardRoutes=require("./dashboard.route")
const systemConfig=require("../../config/system")
const productRoutes=require("./product.route")
const productCategoryRoutes=require("./product.category.route")
const RoleRoutes=require("./role.route.js")
const accountRoutes=require("./account.route")

module.exports=(app)=>{
  const PATH_ADMIN=systemConfig.prefixAdmin
  app.use(PATH_ADMIN+"/dashboard",dashboardRoutes)
  app.use(PATH_ADMIN+"/products", productRoutes)
  app.use(PATH_ADMIN+"/products-category",productCategoryRoutes)
  app.use(PATH_ADMIN+"/roles", RoleRoutes)
  app.use(PATH_ADMIN+`/accounts`, accountRoutes)

}   