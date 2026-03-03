const Order=require('../db/models/order-Schema')
const Razorpay = require('razorpay');
const crypto = require("crypto");
const { log } = require('console');




//placing user order for front-end
module.exports.createOrder=async(req,res)=>{
  const instance = new Razorpay({
    key_id: 'rzp_test_0UhirLOMorKmkZ',
    key_secret: '3mBKJeujIV3wPKyH7ypXINvl',
  });
    const { eventId, totalAmount } = req.body;
  const options = {
    amount:req.body.amount*100 ,
    currency: "INR",  
    receipt:"ffff",

  };
try {
    const order = await instance.orders.create(options);
   
      const newOrder = new Order({ 
          eventId:eventId, 
          amount: req.body.amount,
          paymentId: order.id, 
          items: req.body.items,
          address: req.body.address,
          status: "pending" 
      });
  
      await newOrder.save();
  
    // res.json({ orderId: order.id });
    res.json({...order,...newOrder})
} catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
}
}

module.exports.verifyOrder=async(req,res)=>{

  const{razorpay_payment_id,razorpay_order_id,razorpay_signature, orderId}=req.body;
  console.log("working")
  console.log('order', orderId)
  try {
    
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256",'3mBKJeujIV3wPKyH7ypXINvl')
    .update(body)
    .digest("hex");
 
  if(expectedSignature === razorpay_signature){

    const payment =await Order.findByIdAndUpdate(orderId,{payment:true})
    res.json({ message: "Payment successful", payment });
  }else {

    res.status(400).json({ message: "Invalid signature" });
  }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
  

}

//user order for frontend

module.exports.userOrder=async(req,res)=>{
try {
  const orders=await Order.find() 
  res.json({success:true,orders})
} catch (error) {
  console.log(error);
  res.status(500).json({message:error.message})
  
}
}

//listing orders for admin panel

module.exports.listOrder=async(req,res)=>{
try {
  const orders=await Order.find();
  res.json({success:true,orders})
} catch (error) {
  console.log(error);
  res.status(500).json({message:error.message}) 
}
}

module.exports.updateStatus=async(req,res)=>{
  try{
    await Order.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated"})
  }catch(error){
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}
