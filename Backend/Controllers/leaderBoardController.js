import userModel from "../models/userModel.js";
const fetchLeaderBoard=async(req,res)=>{
    const {email}=req.body;
    try {
        const normalizedEmail=email.toLowerCase();
        const user=await userModel.findOne({email:normalizedEmail});
        const myScore=user.score;
        const leaderBoard=await userModel.find({score:{$gte:0}}).sort({score:-1}).select("userName score leetCodeSolved codeForcesRating codeChefRating").lean();
        const higherRankCount=await userModel.countDocuments({score:{$gt:myScore}});
        const myRank=higherRankCount+1;
        return res.json({success:true,leaderBoard,myRank});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
export {fetchLeaderBoard};