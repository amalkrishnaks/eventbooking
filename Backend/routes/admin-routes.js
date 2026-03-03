const express=require('express');
const {addEvent, listEvent, removeEvent,editEvent, adminLogin, getEvent}=require('../controllers/eventcontroller')

const router=express.Router()


router.post('/add',addEvent)
router.get('/details/:id',getEvent)
router.get('/list',listEvent)
router.patch('/edit/:id',editEvent)
router.delete('/remove/:id',removeEvent)


module.exports=router;