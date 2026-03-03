const jwt=require('jsonwebtoken');


module.exports =(req,res,next)=>{
try {

    const bearertoken=req.headers.authorization;

    //check token 
    if(!bearertoken){
        return res.status(403).json({message:'You are not authorized'})
    } 

    const token=bearertoken.split(' ')[1];
    console.log(token);
    
    //check the token valid
     const key="eventbookingwebsiteklkjkkwewkkvjdwemeqwewejjcggfhokjijihuvfhbhgu345j55weewewenmojok";

     const tokenValid=jwt.verify(token, key);
     console.log(tokenValid);
     
    
    next();
} catch (error) {
    return res.status(500).json({message:'You are not authorized'})
}
}

