const {Schema,model}=require('mongoose');

const userSchema =Schema({
    name:String ,
    description: String,
    date: String,
    availableSeats:Number,
    location:String
  });
  
  const User =model("Users", userSchema);

  module.exports=User;