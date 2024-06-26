const mongoose = require("mongoose");
const cart = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userdetails",
        required:true,
    },
   items:[{

    product:{
    type:  mongoose.Schema.Types.ObjectId,
    ref: "addproduct",
    required: true,
   },
   size:{
    type: String,
    required: false,
   },
   quantity:{
    type:Number,
    default:1,
    required:false,

   },
   price:{
    type:Number,
    default:0,
    required:false,
   },
}
],

   totalprice:{
    type: Number,
    required: false,
   },

   
})

module.exports= (mongoose.model("cart", cart))