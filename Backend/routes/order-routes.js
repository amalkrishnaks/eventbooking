const express=require('express');
const {createOrder, verifyOrder, userOrder, listOrder, updateStatus}=require('../controllers/ordercontroller')

const router=express.Router()

router.post('/create',createOrder);
router.post('/verify',verifyOrder)
router.post('/userorder',userOrder)
router.get('/listorder',listOrder)
router.post('/status',updateStatus);

module.exports=router;