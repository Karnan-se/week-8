const { log } = require("console")
const product = require("../../models/addproduct/addproduct")
const cart = require("../../models/user/cart")
const { default: mongoose } = require("mongoose")



let shop_cart=async(req,res)=>{
    try {
       const userDetails= await req.session.userisAuth._id
       
        if(!userDetails){
            return res.redirect("/user-login")
        }
       var fullTotal = 0
        const productsInCart = await cart.findOne({userId:userDetails}).populate("items.product") 
        for (const item of productsInCart.items) {
            const itemId = item._id;
            const quantity = item.quantity
            const price = item.product.price

           const Localprice = quantity*price;
            console.log(Localprice)
        
            fullTotal += Localprice;

            var updatePrice= await cart.updateOne({_id:productsInCart._id, "items._id" : itemId},{$set:{"items.$.price":Localprice}})

            console.log(updatePrice)
        }
        console.log(fullTotal)
        

       await res.render("user/user-shop-cart.ejs",{Product:productsInCart})

    } catch (error) {
        console.log(error.message)
    }
}

let addtoCart = async(req, res)=>{
    try {

        const userDetails = req.session.userisAuth;
        console.log(userDetails);


        if(!userDetails){
            const data = "redirect";
           return await res.status(200).json({data})
        }
        
        const userId = userDetails?._id;
        console.log(userId);
        let productId = req.query.productDetails;
        let productid = new mongoose.Types.ObjectId(productId)
        console.log(productid);

        if(userId){
            var userID= new mongoose.Types.ObjectId(userId)
        }
        
      let userIncart = await cart.findOne({userId:userID})
      

        if(!userDetails){
            const data = "redirect";
           return await res.status(200).json({data})

        }else if(userIncart){
            const exist= userIncart.items.find(items => items.product == productId)
            
            if(!exist){
                
                const size = req.query.selectedSize;
            const updateToCart = await cart.updateOne({userId:userId},{$addToSet:{items:{product: productId, size:size}}})
            console.log(updateToCart);
            console.log("userExsited so cart updated");
            const data = await cart.findOne({userId:userId}).populate("items.product");
            console.log(data);
            await res.status(200).json({data})
            }else{
                
                console.log("product alreadyexisted")
                const data = "already-Existed"
                return await res.status(200).json({data})
            }
            

        }else{
        
        // console.log(productid) THIIS PART IS NOT WORKIMNG EVEN I HAVE TO

        const size = req.query.selectedSize;
        console.log(size);
        if(size){
            console.log(size);
            const userCart = new cart({
                userId: userId,
                items: [
                 {product:productid,size:size}],
             })
             console.log(userCart);
             userCart.save()
             res.redirect("/");
        }else{
        const userCart = new cart({
           userId: userId,
           items: [
            {product:productid }],
        })
      
        userCart.save()
        res.redirect("/")
    }
}
        
    } catch (error) {
        console.log(error.message)
        
    }
}
let DeleteItem = async(req, res)=>{

    const productId= req.query.itemId;
    console.log(productId);
    const userDetails = req.session.userisAuth._id
    console.log(`userId, ${userDetails}`)
    const DeleteItem = await cart.updateOne(
        { userId: userDetails },
        { $pull: { items:{product:productId}} }
    );
    
    const data = await cart.findOne({userId:userDetails})

    await res.status(200).json(data);

}

let quantityUpdate = async(req, res)=>{
    try {
        const quantity = req.query.number;
        const productId = req.query.productId;
        
        console.log(productId)
        console.log(quantity);
        const userDetails = req.session.userisAuth._id;

        const updateQuantity = await cart.updateOne(
            { userId: userDetails, "items.product": productId }, 
            { $set: { "items.$.quantity": quantity } } 
        );
        
        console.log(updateQuantity);
        var TotalPrice =0;
        

        const AllProductInCart = await cart.findOne({userId:userDetails}).populate("items.product");
        for(item of AllProductInCart.items){           
            const individualPrice =item.product.price*(item.quantity);
            TotalPrice += individualPrice;
            console.log(individualPrice);
            const updatePrice = await cart.updateOne({userId:userDetails, "items._id": item._id},{$set:{"items.$.price":individualPrice}})
            
            console.log(updatePrice);

        }
        const saveTotal = await cart.updateOne({userId:userDetails},{$set:{totalprice : TotalPrice }})
        console.log(saveTotal)

        console.log(TotalPrice)
        const data = TotalPrice
       return await res.status(200).json(data)



        
    } catch (error) {
        console.log(error.message)
        
    }
}
let updatePriceToCart = async(req, res)=>{
    try {
        const totalPrice = req.query.totalPrice;
        console.log(totalPrice)
        const data = "this function is worked";
        await res.status(200).json({data})
        
    } catch (error) {
        
    }
}






module.exports={
    shop_cart,
    addtoCart,
    DeleteItem,
    quantityUpdate,
    updatePriceToCart,

}