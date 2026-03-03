const express=require('express');
const {getEvents,getDetails,signUp,login,getBooking, userLocation, getLocation}=require('../controllers/eventcontroller');
const checkToken = require('../middlewares/check-token');
const router=express.Router();


router.get('/userevent',getEvents);
router.get('/details/:id',getDetails);
router.post('/signup',signUp);
router.post('/login',login)



module.exports=router;