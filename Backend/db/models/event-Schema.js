const {Schema,model}=require('mongoose');

const eventSchema=Schema({
    
    name:{
    type:String,
    required:true,
    },
    description:{
     type:String,
     required:true,   
    },

    date:{
        type:String
    },
    time:{
        type:String
    },
    availableseats:Number,
    image:String,
    location:String,
    address:String,
    // coordinates: { 
    //     lat: { type: Number}, 
    //     lng: { type: Number} 
    // }
   
      
    
    
});

const Event =model("Events", eventSchema);

module.exports=Event;