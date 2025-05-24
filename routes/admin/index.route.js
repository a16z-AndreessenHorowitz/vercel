const dashboardRoutes=require("./dashboard.route")
const systemConfig=require("../../config/system")
const authMiddleware=require("../../middlewares/admin/auth.middleware.js")
const productRoutes=require("./product.route")
const productCategoryRoutes=require("./product.category.route")
const RoleRoutes=require("./role.route.js")
const accountRoutes=require("./account.route")
const authRoutes=require("./auth.route.js")

module.exports=(app)=>{
  const PATH_ADMIN=systemConfig.prefixAdmin
  app.use(PATH_ADMIN+"/dashboard",
    authMiddleware.requireAuth,
    dashboardRoutes
  )
  app.use(PATH_ADMIN+"/products",authMiddleware.requireAuth, productRoutes)
  app.use(PATH_ADMIN+"/products-category",authMiddleware.requireAuth,productCategoryRoutes)
  app.use(PATH_ADMIN+"/roles",authMiddleware.requireAuth, RoleRoutes)
  app.use(PATH_ADMIN+`/accounts`,authMiddleware.requireAuth, accountRoutes)
  app.use(PATH_ADMIN+"/auth",authRoutes)

}   