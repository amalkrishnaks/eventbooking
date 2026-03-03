const {Schema,model}=require('mongoose');


    const orderSchema=Schema({

        eventId:{type:String},
        items:{type:Array,required:true},
        amount:{type:Number},
        address:{type:Object},
        status:{type:String,default:'Order Intializing'},
        date:{type:Date,default:Date.now()},
        payment:{type:Boolean,default:false},
        
    })


  const Order =model("Orders", orderSchema);

  module.exports=Order;