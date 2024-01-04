const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res)=>{
    try{
        const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    const jwtResponse = jwt.verify(token,process.env.JWTKEY)
    req.payload = jwtResponse.userId
    next()
    }catch(err){
        res.status(401).json("Authorization Faild !! please login")
    }
}
module.exports = jwtMiddleware