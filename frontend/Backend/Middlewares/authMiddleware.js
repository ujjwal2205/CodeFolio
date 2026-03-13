import jwt from "jsonwebtoken";
const authMiddleware=(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.json({success:false,message:"Not Authorized!"});
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=req.user||{};
        req.user.email=decode.email;
        req.user.userId=decode.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
export default authMiddleware;