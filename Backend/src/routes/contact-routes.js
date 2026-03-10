const express=require('express');
const{contact}=require('../controllers/contactcontroller')

const router=express.Router();

router.post('/contact',contact)
module.exports=router;