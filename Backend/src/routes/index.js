const express=require('express');
const adminRoutes=require('./admin-routes');
const userRoutes=require('./user-routes');
const imageRoutes=require('./image-routes')
const orderRoutes=require('./order-routes')
const contactRoutes=require('./contact-routes');
const adminLoginRoutes=require('./adminlogin-routes')

const router=express.Router();


router.use('/event',adminRoutes);
router.use('/admin',adminLoginRoutes)
router.use('/user',userRoutes)
router.use('/image',imageRoutes)
router.use('/order',orderRoutes)
router.use('/contactuser',contactRoutes)

module.exports=router;