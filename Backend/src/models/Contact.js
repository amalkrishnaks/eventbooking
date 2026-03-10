const {Schema,model}=require('mongoose');

const contactSchema =Schema({
    firstname:String,
    lastname:String,
    email:String,
    phonenumber:Number,
    subject:String,
    content:String,
    contact:{type:Object},
  });
  
  const Contact =model("Contact", contactSchema);

  module.exports=Contact;