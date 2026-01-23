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
const fetchLeetCodeLeaderBoard=async(req,res)=>{
    const {email}=req.body;
    try {
        const normalizedEmail=email.toLowerCase();
        const user=await userModel.findOne({email:normalizedEmail});
        const myScore=user.leetCodeSolved;
        const leaderBoard=await userModel.find({leetCodeSolved:{$gte:0}}).sort({leetCodeSolved:-1}).select("userName leetCodeSolved").lean();
        const higherRankCount=await userModel.countDocuments({leetCodeSolved:{$gt:myScore}});
        const myRank=higherRankCount+1;
        return res.json({success:true,leaderBoard,myRank});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const fetchCodeChefLeaderBoard=async(req,res)=>{
    const {email}=req.body;
    try {
        const normalizedEmail=email.toLowerCase();
        const user=await userModel.findOne({email:normalizedEmail});
        const myScore=user.codeChefRating;
        const leaderBoard=await userModel.find({codeChefRating:{$gte:0}}).sort({codeChefRating:-1}).select("userName codeChefRating").lean();
        const higherRankCount=await userModel.countDocuments({codeChefRating:{$gt:myScore}});
        const myRank=higherRankCount+1;
        return res.json({success:true,leaderBoard,myRank});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
const fetchCodeForcesLeaderBoard=async(req,res)=>{
    const {email}=req.body;
    try {
        const normalizedEmail=email.toLowerCase();
        const user=await userModel.findOne({email:normalizedEmail});
        const myScore=user.codeForcesRating;
        const leaderBoard=await userModel.find({codeForcesRating:{$gte:0}}).sort({codeForcesRating:-1}).select("userName codeForcesRating").lean();
        const higherRankCount=await userModel.countDocuments({codeForcesRating:{$gt:myScore}});
        const myRank=higherRankCount+1;
        return res.json({success:true,leaderBoard,myRank});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message});
    }
}
export {fetchLeaderBoard,fetchLeetCodeLeaderBoard,fetchCodeChefLeaderBoard,fetchCodeForcesLeaderBoard};