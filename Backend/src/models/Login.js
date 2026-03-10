const { Schema,model}=require('mongoose');

const loginSchema=Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});
const Login=model('login',loginSchema);

module.exports=Login;
