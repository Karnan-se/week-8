const express= require('express');
const userrouter = express.Router()
const userController= require("../../controller/usercontroller/usercontroller")
const userpostcontroller= require("../../controller/usercontroller/userpostcontroller")
const productController = require("../../controller/usercontroller/productcontroller")
const auth = require("../../middlewares/multer/userSession")
const MyAccount = require("../../controller/usercontroller/user-account")
const wishlist = require("../../controller/usercontroller/shopwishlist")
const shopCart = require("../../controller/usercontroller/shop-cart")
const checkout = require("../../controller/usercontroller/checkout");
const rating= require("../../controller/usercontroller/ratingscontroller")

userrouter.use(express.static("public"));

userrouter.get("/",userController.user_index)
userrouter.get("/user-login",userController.userlogin)
userrouter.get("/user-register",userController.user_register)
userrouter.get("/user-logout",userController.user_out)

userrouter.post("/user-login",userpostcontroller.user_login) 
userrouter.post("/user-register",userpostcontroller.user_register)

userrouter.get("/sendotp",userpostcontroller.sendOtp)
userrouter.get("/verifyotp",userpostcontroller.verifyOtp)
userrouter.get("/shop-grid-right",userController.shop_grid_right)
userrouter.get("/submit-image", userController.submit_image)
userrouter.get("/low-to-high",userController.low_High)
userrouter.get("/High-to-low",userController.High_low)



userrouter.get("/myAccount",MyAccount.user_page_account)
userrouter.post("/currentPassword",MyAccount.currentPassword)
userrouter.post("/newpasswordchange",MyAccount.newpasswordchange)
userrouter.post("/addAddress", MyAccount.addAddress)
userrouter.get("/updateAddressStatus",MyAccount.updateAddressStatus)
userrouter.get("/deleteAddress",MyAccount.deleteAddress)
userrouter.get("/updateName",MyAccount.updateName)
userrouter.get("/editAddressfields",MyAccount.editAddressfields)


userrouter.get("/shop-product-right",productController.shop_product_right)

userrouter.get("/shop-cart",shopCart.shop_cart )
userrouter.get("/addtoCart",shopCart.addtoCart )
userrouter.get("/deleteFromCart",shopCart.DeleteItem )
userrouter.get("/quantityUpdate",shopCart.quantityUpdate )
userrouter.get("/updatePriceToCart",shopCart.updatePriceToCart)



userrouter.get("/checkout",checkout.checkout)
userrouter.post("/welcomePage",checkout.welcomePage)


userrouter.get("/shop-wishlist",wishlist.shopWishlist)

userrouter.post("/addratings",rating.addratings)
userrouter.get("/ratings",rating.loadratings)








module.exports=userrouter