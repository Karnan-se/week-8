const mongoose = require('mongoose');
const {format} = require('date-fns')
const user = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:false
    },
    isActive:{
        type:Boolean,
        required:false,
        default:true
    }
});


    user.pre('save',async function(next){

        try {
            if(!this.date) {
                const currentdate = new Date();
                this.date= currentdate;
            }
            
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
    user.pre('save', async function(next){
        try{
            this.isActive= true;
            next();
        }catch(error){
            console.log(`this is the middleware for save function ${error}`)
        }
    })

    user.methods.formateDate = function () {
        return format(this.date, 'dd-MM-yyyy')
    }

    module.exports=mongoose.model('user',user);
