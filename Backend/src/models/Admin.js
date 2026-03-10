const {Schema,model}=require('mongoose');


const adminSchema =Schema({
    name:String,
    password:{
        type:String,
        required:true,
    }
  });
  
  const Admin =model("Admin", adminSchema);

  module.exports=Admin;