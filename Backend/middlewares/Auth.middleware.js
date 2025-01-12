import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if(!token){
    return res.status(401).json({message:"Unauthorized"});
  }
  jwt.verify(token,process.env.JWT_KEY,(err,payload)=>{
    if(err){
      return res.status(401).json({message:"Unauthorized"});
    }
    req.userId = payload.userId;
    next();
  });
};
