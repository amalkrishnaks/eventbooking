const Contact=require('../db/models/contact-schema')


module.exports.contact=async(req,res)=>{
 try {
    const newContact = new Contact({ 
        eventId:req.body.eventId , 
        contact:req.body.contact,
       
        });
        await newContact.save();
        res.json(newContact)
 } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
 }   
}