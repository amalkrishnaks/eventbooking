const Admin=require('../db/models/admin-schema')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


// //admin login

module.exports.adminLogin=async(req,res)=>{
    try {
        const {name,password}=req.body;
        const admin = await Admin.findOne({ name });
        const hashPassword=await bcrypt.hash(password, 3);

        const newAdmin=new Admin({
            name:name,
            password:hashPassword,
        })
        await newAdmin.save();

        if (!admin) {
            return res.status(400).json({ message: "Invalid credentials" });
          }
        
          const isMatch = await bcrypt.compare(password, admin.password);
          if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
          }
          
           const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRETKEY, { expiresIn: "1h" });
          
        return res.status(200).json({message:'Signed Up Successfully', token});
    } catch (error) {

        res.status(500).json({message:error.message}) 
    }
}