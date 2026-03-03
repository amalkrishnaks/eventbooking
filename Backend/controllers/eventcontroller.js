const Event=require('../db/models/event-Schema');
const Login=require('../db/models/login-Schema')
const UserLocation=require('../db/models/location-schema')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const checkToken=require('../middlewares/check-token')


//signup user


module.exports.signUp=async(req,res)=>{
    try {
    const {name,email,password}=req.body;
    
    const user=await Login.findOne({email:email});
    if(user){
        return res.status(400).json({message:'Email Already taken'});
    }

    const hashedPassword=await bcrypt.hash(password, 2);

    const newUser=new Login({
        name:name,
        email:email,
        password:hashedPassword 
    })

    await newUser.save();
    console.log(newUser);

    return res.status(200).json({message:'Signed Up Successfully'});

    } catch (e) {
        res.status(500).json({message:e.message})
        
    }
}

//login user

module.exports.login=async(req,res)=>{
    try {
        
        const {email,password}=req.body;
        
        const user=await Login.findOne({email: email});

        if(!user){
            return res.status(400).json({message:"Email or Password Incorrect"})
        }

        const matching=await bcrypt.compare(password, user.password)
        if(!matching){
            return res.status(400).json({message:"Email or Password incorrect"})
        }

         const token=jwt.sign({id:user._id},process.env.JWT_KEY,{expiresIn:'7d'})

        return res.status(200).json({message:'Login  Successfully',token});
    } catch (error) {
        res.status(500).json({message:error.message})
    }   
}





// admin add new event
module.exports.addEvent=async(req,res)=>{
    try {
    const newEvent = new Event({
            name:req.body.name,
            description:req.body.description,   
            date:req.body.date,
            time:req.body.time,
            availableseats:req.body.availableseats,
            image:req.body.image,
            location:req.body.location,
            address:req.body.address,
        // coordinates: { lat, lng }
    });
      await newEvent.save()
        res.status(200).json({message:'event added'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.error})
    }
}
    

//event id
module.exports.getEvent=async(req,res)=>{
    try {
        const events=await Event.findById(req.params.id);
        if(events) res.json(events);
    } catch (error) {
        res.status(404).send('event not found')
    }
}



//admin all events list

module.exports.listEvent=async(req,res)=>{
try {
    const events=await Event.find();
    res.status(200).json({data:events})
} catch (error) {
    console.log(error)
    res.status(500).json({message:e.error})
}
}

// admin remove events

module.exports.removeEvent=async(req,res)=>{
try {
    const {id}=req.params;
    const response=await Event.findByIdAndDelete(id);
    return res.status(200).json({message:"event deleted"});
} catch (error) {
    return res.status(500).json({message:error.message});
}
}


//admin edit

module.exports.editEvent=async(req,res)=>{
    try {
        const { name,description, date, time,availableseats,image, location,address} = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { name,description, date, time, availableseats,location,image,address},
            { new: true } // Return updated document
          );

          if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
          }
      
          res.json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        res.status(500).json({ message: "Error updating event", error });
    }
}


//user
module.exports.getEvents=async(req,res)=>{
    try {
        const events=await Event.find();
        res.status(200).json({data:events})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:e.error})
    }
}

module.exports.getDetails= async(req,res)=>{
    try {
        const events=await Event.findById(req.params.id);
        if(events) res.json(events);
    } catch (error) {
        res.status(404).send('event not found')
    }
}
